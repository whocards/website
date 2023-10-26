import {eq} from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/postgres-js'
import {createInsertSchema} from 'drizzle-zod'
import postgres from 'postgres'
import {z} from 'zod'
import {env} from '~env-secrets'
import * as schemas from './schema'

const client = postgres(env.DB_URL)
export const db = drizzle(client, {schema: schemas})

const {purchases, users, shippings} = schemas

// types
export type PurchaseCreate = typeof purchases.$inferInsert
export type PurchaseSelect = typeof purchases.$inferSelect
export type UserCreate = typeof users.$inferInsert
export type UserSelect = typeof users.$inferSelect
export type ShippingCreate = typeof shippings.$inferInsert
export type ShippingSelect = typeof shippings.$inferSelect
export type FullPurchase = Awaited<ReturnType<typeof getPurchaseById>>

// schemas
export const schema = {...schemas}
export const insertUserSchema = createInsertSchema(users)
export const insertPurchaseSchema = createInsertSchema(purchases)
export const insertShippingSchema = createInsertSchema(shippings, {
  quantity: z.coerce.number(),
  address: z.string().min(1, {message: 'Field is required'}),
  zip: z.string().min(1, {message: 'Field is required'}),
  country: z.string().min(1, {message: 'Field is required'}),
  city: z.string().min(1, {message: 'Field is required'}),
  phone: z.string().regex(/^[\d\s()+-.]+$/, {message: 'Invalid phone number'}),
  company: z.string().optional().default(''),
})

// queries
export const getPurchaseById = (purchaseId: string) =>
  db
    .select()
    .from(purchases)
    .where(eq(purchases.id, purchaseId))
    .innerJoin(users, eq(purchases.userId, users.id))
    .leftJoin(shippings, eq(purchases.id, shippings.purchaseId))
    .then((rows) => rows[0])

export const insertShippingAddress = (shipping: ShippingCreate) =>
  db
    .insert(schema.shippings)
    .values(shipping)
    .onConflictDoUpdate({
      target: shippings.id,
      set: shipping,
    })
    .returning()
    .then((rows) => rows[0])

export const insertUser = (user: UserCreate) =>
  db
    .insert(schema.users)
    .values(user)
    .onConflictDoUpdate({target: schema.users.email, set: user})
    .returning()
    .then((rows) => rows[0])
