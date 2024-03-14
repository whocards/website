import {z} from 'zod'
import countries from '~data/countries.json'

export const thankYouFormSchema = z.object({
  privacy: z
    .literal('on', {errorMap: () => ({message: 'Field is required'})})
    .pipe(z.preprocess((val) => !!val && val === 'on', z.boolean())),
  newsletter: z.preprocess((val) => !!val && val === 'on', z.boolean()).optional(),
})

export const countryString = z.string().transform((val, ctx) => {
  const country = countries.find((c) => c.name === val || c.code === val)
  if (!country) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A valid Country is required',
    })

    return z.NEVER
  }

  return country.code
})

export const orderSchema = z.object({
  count: z.coerce.number().int(),
  priceId: z.string(),
  shippingId: z.string(),
})

export type Order = z.infer<typeof orderSchema>

export const purchaseSheetSchema = z.object({
  id: z.string(),
  date: z.date().transform((val) => val.toISOString().split('T')[0]),
  name: z.string(),
  email: z.string(),
  price: z.number(),
  netPrice: z.number(),
  category: z.string(),
})

export type PurchaseSheetEntry = z.infer<typeof purchaseSheetSchema>
