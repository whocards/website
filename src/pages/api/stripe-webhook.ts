import type {APIRoute} from 'astro'
import Stripe from 'stripe'
import {products} from '~constants/products'
import {env} from '~env-secrets'
import {createShippingSheetRow, createZenShipping} from '~server/csv'
import {
  db,
  insertPurchaseSchema,
  insertShippingAddress,
  insertShippingSchema,
  insertUser,
  insertUserSchema,
  schema,
} from '~server/db'
import {createPurchaseSheetRow} from '~server/gsheet'
import {purchaseSheetSchema} from '~utils/schemas'

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY)

export const POST: APIRoute = async ({request}) => {
  if (new URL(request.url).searchParams.get('auth_token') !== env.WEBHOOK_AUTH_TOKEN) {
    return new Response('Unauthorized', {status: 401})
  }

  const sig = request.headers.get('stripe-signature')

  console.log('Received signature:', sig)

  let event: Stripe.Event

  try {
    if (!sig) throw new Error('No signature')
    event = stripe.webhooks.constructEvent(await request.text(), sig, env.STRIPE_WEBHOOK_SECRET)

    if (event.livemode !== true) {
      console.log('Received event in test mode:')
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        {
          console.log('handling event', event.type)
          console.log(JSON.stringify(event, null, 2))

          const charge = event.data.object

          const product = products.find((p) => p.price * 100 === charge.amount_subtotal) ?? {
            title: 'Unknown product',
            quantity: 0,
          }

          // create db user
          const userSchema = insertUserSchema.safeParse({
            name: charge.customer_details?.name,
            email: charge.customer_details?.email,
          })

          if (!userSchema.success) {
            console.error('user data failed', userSchema.error)
            throw new Error(userSchema.error.toString())
          }

          const dbUser = await insertUser(userSchema.data)

          // create db purchase
          const purchaseSchema = insertPurchaseSchema.safeParse({
            id: charge.id,
            price: charge.amount_total,
            netPrice: charge.amount_subtotal,
            date: new Date(charge.created * 1000),
            category: product.title,
            userId: dbUser.id,
          })

          if (!purchaseSchema.success) {
            console.error(purchaseSchema.error)
            throw new Error('purchase details failed')
          }

          // create sheet purchase
          const purchaseSheetEntrySchema = purchaseSheetSchema.safeParse({
            ...purchaseSchema.data,
            price: purchaseSchema.data.price / 100,
            netPrice: purchaseSchema.data.netPrice / 100,
            name: dbUser.name,
            email: dbUser.email,
          })

          if (!purchaseSheetEntrySchema.success) {
            console.error(purchaseSheetEntrySchema.error)
            throw new Error('sheet entry details failed')
          }

          // insert purchases
          const [dbPurchase, sheetPurchase] = await Promise.allSettled([
            db.insert(schema.purchases).values(purchaseSchema.data).returning(),
            createPurchaseSheetRow(purchaseSheetEntrySchema.data),
          ])

          // create db shipping
          const address = charge.shipping_details?.address

          if (!address) {
            throw new Error('no address')
          }

          const shippingSchema = insertShippingSchema.safeParse({
            ...userSchema.data,
            phone: charge.customer_details?.phone,
            quantity: product.quantity,
            price: charge.amount_total,
            country: address?.country,
            region: address?.state,
            city: address?.city,
            zip: address?.postal_code,
            address: address?.line1,
            postalCode: address?.postal_code,
            address2: address?.line2,
            purchaseId: event.id,
            company: charge.custom_fields[0]?.text?.value ?? '',
          })

          if (!shippingSchema.success) {
            console.error(shippingSchema.error)
            throw new Error('shipping details failed')
          }

          const dbShipping = await insertShippingAddress(shippingSchema.data)
          const zenShipping = await createZenShipping(dbShipping)

          if (!!zenShipping?.errors?.length) {
            console.error('zen shipping failed', zenShipping)
            throw new Error('zen shipping failed')
          }

          const sheetShipping = await createShippingSheetRow(dbShipping)

          console.log('purchase webhook success')
          console.log(
            JSON.stringify(
              {dbPurchase, sheetPurchase, dbShipping, zenShipping, sheetShipping},
              null,
              2
            )
          )
        }
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return new Response('Success', {status: 200})
  } catch (err) {
    console.error(err)
    return new Response(`Webhook Error: ${(err as Error).message}`, {status: 400})
  }
}
