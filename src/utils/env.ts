import {createEnv} from '@t3-oss/env-core'
import {z} from 'zod'

// TODO move scripts/env here

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  server: {
    SANITY_PROJECT_ID: z.string().min(1),
    SANITY_DATASET: z.string().min(1),
  },
  client: {
    PUBLIC_IS_PROD: z.boolean(),
    //   PUBLIC_SANITY_STUDIO_PROJECT_ID: z.string().min(1),
    //   PUBLIC_SANITY_STUDIO_DATASET: z.string().min(1),
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    PUBLIC_IS_PROD: process.env.CONTEXT === 'production',
  },
  clientPrefix: 'PUBLIC_',
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
})
