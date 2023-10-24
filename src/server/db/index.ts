import {eq} from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/postgres-js'
import {createInsertSchema} from 'drizzle-zod'
import postgres from 'postgres'
import {z} from 'zod'
import {env} from '~env-secrets'
import * as schema from './schema'

const client = postgres(env.DB_URL)
export const db = drizzle(client, {schema})

// types
export type PurchaseCreate = typeof schema.purchases.$inferInsert
export type PurchaseSelect = typeof schema.purchases.$inferSelect
export type UserSelect = typeof schema.users.$inferSelect
export type ShippingCreate = typeof schema.shippings.$inferInsert
export type ShippingSelect = typeof schema.shippings.$inferSelect
export type PurchaseWithUser = {user: UserSelect; purchase: PurchaseSelect}

// schemas
export const schemas = {...schema}
export const insertUserSchema = createInsertSchema(schema.users)
export const insertPurchaseSchema = createInsertSchema(schema.purchases)
export const insertShippingSchema = createInsertSchema(schema.shippings, {
  quantity: z.coerce.number(),
  address: z.string().min(1, {message: 'Field is required'}),
  zip: z.string().min(1, {message: 'Field is required'}),
  country: z.string().min(1, {message: 'Field is required'}),
  city: z.string().min(1, {message: 'Field is required'}),
  phone: z.string().regex(/^[\d\s()+-.]+$/, {message: 'Invalid phone number'}),
})

// queries
export const getPurchaseById = (purchaseId: string) =>
  db
    .select()
    .from(schemas.purchases)
    .where(eq(schemas.purchases.id, purchaseId))
    .leftJoin(schemas.users, eq(schemas.purchases.userId, schemas.users.id))
    .then((rows) => rows[0])

export const insertShippingAddress = (shipping: ShippingCreate) =>
  db.insert(schemas.shippings).values(shipping).returning()
