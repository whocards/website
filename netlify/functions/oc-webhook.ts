import type {Handler} from '@netlify/functions'
import {serialize} from 'object-to-formdata'
import {openCollectiveProducts} from '~constants/products'
import {env} from '~env-secrets'
import {db, insertPurchaseSchema, insertUserSchema, schemas} from '~server/db'
import {graphQLClient, userEmailQuery, type UserWithEmail} from '~server/graphql'
import type {Contribution} from '~types/contributions'

const handledTypes = ['collective.transaction.created']

const exit = (statusCode: number, reason: string) => {
  console.log(reason)
  console.log('=================')
  return {statusCode}
}

const handler: Handler = async (event, context) => {
  // validate auth
  const authToken = event.queryStringParameters?.auth_token
  if (authToken !== env.WEBHOOK_AUTH_TOKEN) {
    return exit(401, 'INVALID AUTH TOKEN')
  }
  // validate method
  if (event.httpMethod !== 'POST') {
    return exit(405, 'INVALID METHOD')
  }

  // validate and parse body
  if (!event.body) {
    return exit(400, 'NO BODY')
  }

  console.log('=================')
  console.log('handling webhook')
  console.log(event.body)

  const body = JSON.parse(event.body) as Contribution
  if (!handledTypes.includes(body.type)) {
    console.log('SKIPPING TYPE', body.type)
    return {statusCode: 200}
  }

  // get contribution type
  const {description} = body.data.transaction
  const product = openCollectiveProducts.find((p) => description.includes(p.title))
  const contributionType = product?.title ?? description

  console.log('contributionType', contributionType)

  // get users email
  const user = await graphQLClient.request<UserWithEmail>(userEmailQuery, {
    slug: body.data.fromCollective.slug,
  })
  console.log('user', user)
  const email = user.individual.emails[0]

  // validate user exists
  const parseUser = insertUserSchema.parse({
    name: body.data.fromCollective.name,
    ocSlug: body.data.fromCollective.slug,
    email,
  })

  const [dbUser] = await db
    .insert(schemas.users)
    .values(parseUser)
    .onConflictDoUpdate({target: schemas.users.email, set: {name: parseUser.name}})
    .returning()

  const purchase = insertPurchaseSchema.parse({
    id: body.data.transaction.uuid,
    price: body.data.transaction.amountInHostCurrency,
    netPrice: body.data.transaction.netAmountInHostCurrency,
    date: new Date(body.data.transaction.createdAt),
    category: contributionType,
    userId: dbUser.id,
  })

  // add to DB and sheets
  const [dbEntry, sheetEntry] = await Promise.allSettled([
    db.insert(schemas.purchases).values(purchase).returning(),
    fetch(env.PURCHASE_SHEET_URL, {
      method: 'POST',
      body: serialize({
        id: purchase.id,
        date: purchase.date.toISOString().split('T')[0],
        name: dbUser.name,
        email: dbUser.email,
        price: purchase.price / 100,
        netPrice: purchase.netPrice / 100,
        category: purchase.category,
      }),
    }).then((res) => res.json()),
  ])

  console.log({dbEntry, sheetEntry})

  console.log('=================')
  return {statusCode: 200}
}

export {handler}
