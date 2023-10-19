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
    DB_URL: z.string(),
    SHEET_URL: z.string(),
    STRIPE_PUBLIC_KEY: z.string(),
  },
  runtimeEnv: import.meta.env,
})
