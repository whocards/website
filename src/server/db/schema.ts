import {relations} from 'drizzle-orm'
import {boolean, integer, pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core'

// user -> many purchases
export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  newsletter: boolean('newsletter').default(false).notNull(),
})

export const usersRelations = relations(users, ({many}) => ({
  purchases: many(purchases),
}))

// purchase -> one user
export const purchases = pgTable('purchase', {
  id: text('id').primaryKey().notNull(),
  price: integer('price').notNull(),
  date: timestamp('date', {mode: 'date'}).notNull(),
  category: text('category').notNull(),
  netPrice: integer('netPrice').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

export const purchasesRelations = relations(purchases, ({one}) => ({
  shipping: one(shippings, {
    fields: [purchases.id],
    references: [shippings.purchaseId],
  }),
  user: one(users, {
    fields: [purchases.userId],
    references: [users.id],
  }),
}))

export const shippings = pgTable('shipping', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  company: text('company'),
  address: text('address').notNull(),
  address2: text('address2'),
  zip: text('zip').notNull(),
  city: text('city').notNull(),
  region: text('region'),
  quantity: integer('quantity').notNull(),
  country: text('country').notNull(),
  purchaseId: text('purchaseId')
    .notNull()
    .references(() => purchases.id)
    .unique(),
})

export const shippingRelations = relations(shippings, ({one}) => ({
  purchase: one(purchases, {
    fields: [shippings.purchaseId],
    references: [purchases.id],
  }),
}))
