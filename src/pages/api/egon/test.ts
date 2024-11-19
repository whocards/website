import type {APIRoute} from 'astro'
import {env} from '~env-secrets'

const EGON_API_URL = 'https://api.isklad.eu/rest/v1'

export const GET: APIRoute = async ({request}) => {
  console.log('=================')
  console.log('testing')

  const req = await fetch(EGON_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      auth: {
        auth_id: env.EGON_AUTH_ID,
        auth_key: env.EGON_AUTH_KEY,
        auth_token: env.EGON_AUTH_TOKEN,
      },
      request: {
        req_method: 'InventoryDetail',
        req_data: {
          item_id_list: [],
        },
      },
    }),
  }).then(async (r) => await r.json())

  return new Response(JSON.stringify(req))
}
