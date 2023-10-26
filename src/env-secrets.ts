import {createEnv} from '@t3-oss/env-core'
import {z} from 'zod'

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
  },
  runtimeEnv: process.env,
})
