import type {APIRoute} from 'astro'
import {z} from 'zod'
import {db} from '~server/db'
import {conferenceQuestionTracking} from '~server/db/schema'

export const prerender = false

const zEvent = z.object({
  eventId: z.number(),
  userId: z.string().optional(),
  questionId: z.number(),
  isBack: z.boolean().optional(),
})

export const POST: APIRoute = async ({request}) => {
  const body = await request.json()
  const data = zEvent.safeParse(body)

  if (!data.success) {
    return new Response(data.error.toString(), {status: 400})
  }

  const {eventId, userId, questionId, isBack} = data.data

  try {
    await db.insert(conferenceQuestionTracking).values({
      conferenceId: eventId,
      questionId,
      isBack,
      user: userId,
    })
  } catch (error) {
    console.error(error)
    return new Response(`error: ${error instanceof Error ? error.message : String(error)}`, {
      status: 500,
    })
  }

  return new Response(JSON.stringify({success: true}), {status: 200})
}
