import {drizzle} from 'drizzle-orm/postgres-js'
import {createInsertSchema} from 'drizzle-zod'
import postgres from 'postgres'
import {env} from '~env-secrets'
import * as schema from './schema'

const client = postgres(env.DB_URL)
export const db = drizzle(client, {schema})

// types
export type PurchaseCreate = typeof schema.purchases.$inferInsert

// schemas
export const schemas = {...schema}
export const insertUserSchema = createInsertSchema(schema.users)
export const insertPurchaseSchema = createInsertSchema(schema.purchases)
