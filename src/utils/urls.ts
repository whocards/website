import type {QuestionId} from '~types'

export const AMPLITUDE_API_KEY = import.meta.env.PUBLIC_AMPLITUDE_API_KEY

export const getTrimmedPath = () => window.location.pathname.replace(/\/$/, '')

/**
 *
 */
export const getCurrentQuestionId = (): QuestionId => {
  return getTrimmedPath().split('/').pop() as QuestionId
}

/**
 * defaultLang in case we want to start from different language in the future
 */
export const getFirstQuestionUrl = (id?: QuestionId, lang?: string) => {
  if (!id) return ''
  // pathname with removed trailing slash
  let url = getTrimmedPath().replace(/^\//, '')

  // handle '/' route
  return `${window.location.origin}/${lang || url}/question/${id}`
}

/**
 *
 */
export const getQuestionUrl = (id: QuestionId) => {
  if (!id) return ''

  return window.location.origin + getTrimmedPath().replace(/\/[^\/]*$/, `/${id}`)
}
