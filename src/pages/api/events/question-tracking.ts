import type {APIRoute} from 'astro'
import {eq} from 'drizzle-orm'
import {z} from 'zod'
import {db} from '~server/db'
import {conference, conferenceQuestionTracking} from '~server/db/schema'

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

  const {message, code} = await db.transaction(async (tx) => {
    const currentConference = await tx.query.conference.findFirst({
      where: eq(conference.id, eventId),
    })

    if (!currentConference) {
      return {message: 'Conference not found', code: 404}
    }

    if (!currentConference.isActive) {
      return {message: 'Conference is not active', code: 400}
    }

    const res = await tx
      .insert(conferenceQuestionTracking)
      .values({
        conferenceId: currentConference.id,
        questionId,
        isBack,
        user: userId,
      })
      .returning({id: conferenceQuestionTracking.id})

    console.log(res)

    if (res.length === 0) {
      return {message: 'Failed to insert question tracking', code: 500}
    }

    return {message: 'Success', code: 201}
  })

  return new Response(JSON.stringify({message}), {status: code})
}
