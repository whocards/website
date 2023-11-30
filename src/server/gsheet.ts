import {serialize} from 'object-to-formdata'
import {env} from '~env-secrets'
import {type UserCreate} from '~server/db'

export const createContactSheetRow = async (data: UserCreate) =>
  fetch(env.CONTACTS_SHEET_URL, {
    method: 'POST',
    body: serialize({
      ...data,
      date: new Date().toISOString().split('.')[0],
    }),
  })
