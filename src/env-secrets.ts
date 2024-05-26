import {createEnv} from '@t3-oss/env-core'
import {z} from 'zod'

const stripeIds = z.object({
  price: z.string(),
  shipping: z.string(),
})

export const env = createEnv({
  server: {
    WEBHOOK_AUTH_TOKEN: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    CONTEXT: z.string().optional(),
    OC_API_KEY: z.string(),
    OC_API_URL: z.string(),
    OC_URL: z.string(),
    OC_PRODUCT_IDS: z.string().transform((val: string) => val.split(',')),
    OC_REDIRECT_URL: z.string().optional(),
    ZEN_API_KEY: z.string(),
    ZEN_API_URL: z.string(),
    DB_URL: z.string(),
    PURCHASE_SHEET_URL: z.string(),
    SHIPPING_SHEET_URL: z.string(),
    CONTACTS_SHEET_URL: z.string(),
    STRIPE_PRIVATE_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_PRODUCTS: z.string().transform((val) =>
      z
        .object({
          1: stripeIds,
          2: stripeIds,
          5: stripeIds,
          12: stripeIds,
        })
        .parse(JSON.parse(val))
    ),
    EGON_AUTH_ID: z.string(),
    EGON_AUTH_KEY: z.string(),
    EGON_AUTH_TOKEN: z.string(),
  },
  clientPrefix: 'PUBLIC_',
  client: {
    PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  },
  runtimeEnv: import.meta.env,
})
