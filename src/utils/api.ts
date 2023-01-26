import type {
  Language,
  LanguagesResponse,
  QuestionsResponse,
  QuestionsResponse1Lang,
} from 'types/Questions'
import { resJson } from '~utils'
import { DATA_URL } from './constants'

const ALL_LANGUAGES_URL = DATA_URL + '/languages.json'
const ALL_QUESTIONS_URL = DATA_URL + '/questions.json'

export const fetchLangs = (): Promise<LanguagesResponse> =>
  fetch(ALL_LANGUAGES_URL).then(resJson)

export const fetchAllQuestions = (): Promise<QuestionsResponse> =>
  fetch(ALL_QUESTIONS_URL).then(resJson)

export const fetchOneLang = (lang: Language): Promise<QuestionsResponse1Lang> =>
  fetch(DATA_URL + `/${lang}.json`).then(resJson)
