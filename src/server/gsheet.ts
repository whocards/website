import {serialize} from 'object-to-formdata'
import {env} from '~env-secrets'
import {type UserCreate} from '~server/db'
import type {PurchaseSheetEntry} from '~utils/schemas'

export const createContactSheetRow = async (data: UserCreate) =>
  fetch(env.CONTACTS_SHEET_URL, {
    method: 'POST',
    body: serialize({
      ...data,
      date: new Date().toISOString().split('.')[0],
    }),
  })

export const createPurchaseSheetRow = async (data: PurchaseSheetEntry) =>
  fetch(env.PURCHASE_SHEET_URL, {
    method: 'POST',
    body: serialize({
      id: data.id,
      date: data.date,
      name: data.name,
      email: data.email,
      price: data.price,
      netPrice: data.netPrice,
      category: data.category,
    }),
  }).then((res) => res.json())
