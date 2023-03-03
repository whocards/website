import type {QuestionId, Language} from '~types'
import {DEFAULT_LANGUAGE} from './constants'

export const getTrimmedPath = () => window.location.pathname.replace(/\/$/, '')

/**
 *
 */
export const getCurrentQuestionId = (): QuestionId => {
  return window.location.pathname.split('/').pop() as QuestionId
}

/**
 * defaultLang in case we want to start from different language in the future
 */
export const getFirstQuestionUrl = (id?: QuestionId, defaultLang: string = DEFAULT_LANGUAGE) => {
  if (!id) return ''
  // pathname with removed trailing slash
  let url = getTrimmedPath().replace(/^\//, '')
  // handle '/' route
  return `/${url || defaultLang}/question/${id}`
}

/**
 *
 */
export const getQuestionUrl = (id: QuestionId) => {
  if (!id) return ''
  return getTrimmedPath().replace(getCurrentQuestionId(), id)
}
