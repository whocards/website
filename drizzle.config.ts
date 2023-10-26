import * as dotenv from 'dotenv'
import type {Config} from 'drizzle-kit'
dotenv.config()

const config: Config = {
  schema: './src/server/db/schema.ts',
  driver: 'pg',
  verbose: true,
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
}

export default config
