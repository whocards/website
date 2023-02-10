import type {Handler} from '@netlify/functions'
import type {Language, QuestionId} from 'types/Questions'
import languages from 'public/data/languages.json'
import questions from 'public/data/questions.json'
import crypto from 'crypto'

const DEFAULT_LANG = 'en'

const VALID_LANGS = Object.keys(languages)

const handler: Handler = async (event, context) => {
  // validate method
  if (event.httpMethod !== 'GET') {
    return {statusCode: 405}
  }
  // validate language
  const lang = (event.queryStringParameters?.lang || DEFAULT_LANG) as Language

  if (!VALID_LANGS.includes(lang)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `lang=${lang} is invalid`,
        options: VALID_LANGS.join(', '),
      }),
    }
  }

  // validate question
  const id = (event.queryStringParameters?.qid ||
    crypto.randomInt(1, 66).toString()) as QuestionId

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
