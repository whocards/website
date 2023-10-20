import {pgTable, pgEnum, text, integer, timestamp, boolean} from 'drizzle-orm/pg-core'

import {sql} from 'drizzle-orm'
export const keyStatus = pgEnum('key_status', ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
])
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum('code_challenge_method', ['s256', 'plain'])
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified'])
export const factorType = pgEnum('factor_type', ['totp', 'webauthn'])

export const purchase = pgTable('Purchase', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  slug: text('slug').notNull(),
  price: integer('price').notNull(),
  date: timestamp('date', {precision: 3, mode: 'string'}).notNull(),
  category: text('category').notNull(),
  addressProvided: boolean('addressProvided').default(false).notNull(),
  netPrice: integer('netPrice').notNull(),
})
