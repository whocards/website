import type {APIRoute} from 'astro'

export const POST: APIRoute = async ({request}) => {
  console.log('=================')
  console.log('handling webhook')
  const body = await request.json()
  console.log(body)
  return new Response('ok', {status: 200})
}
