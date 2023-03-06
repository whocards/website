import type {Handler} from '@netlify/functions'
import type {Language, QuestionId} from '~types'
import questions from '~data/questions.json'
import crypto from 'crypto'
import {LANG_KEYS, DEFAULT_LANGUAGE} from '~utils'

const handler: Handler = async (event, context) => {
  // validate method
  if (event.httpMethod !== 'GET') {
    return {statusCode: 405}
  }
  // validate language
  const lang = (event.queryStringParameters?.lang || DEFAULT_LANGUAGE) as Language

  if (!LANG_KEYS.includes(lang)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `lang=${lang} is invalid`,
        options: LANG_KEYS.join(', '),
      }),
    }
  }

  // validate question
  const id = (event.queryStringParameters?.qid || crypto.randomInt(1, 66).toString()) as QuestionId

  return {
    statusCode: 200,
    body: JSON.stringify({
      id,
      question: questions[id][lang],
      url: new URL(event.rawUrl).origin + `/questions/${lang}/${id}`,
    }),
  }
}

export {handler}
