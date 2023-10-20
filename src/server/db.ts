import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {env} from '~env-secrets'
import {purchase} from './schema/schema'

const client = postgres(env.DB_URL)
export const db = drizzle(client)

export const schema = {
  purchase,
}

export type PurchaseCreate = typeof purchase.$inferInsert
