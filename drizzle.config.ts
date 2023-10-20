import * as dotenv from 'dotenv'
import type {Config} from 'drizzle-kit'
dotenv.config()

const config: Config = {
  schema: './src/server/schema.ts',
  out: './src/server/schema',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
}

export default config
