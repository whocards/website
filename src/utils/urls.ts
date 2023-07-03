import {DEFAULT_LANGUAGE} from '~utils'
import {idsStore} from '~stores/Game.store'
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
export const getCurrentQuestionUrl = (lang?: string) => {
  // pathname with removed trailing slash
  let url = getTrimmedPath().replace(/^\//, '') || DEFAULT_LANGUAGE

  // handle '/' route
  return `${window.location.origin}/${lang || url}/question/${idsStore.get().current}`
}

/**
 *
 */
export const getQuestionUrl = (id: QuestionId) => {
  if (!id) return ''

  return window.location.origin + getTrimmedPath().replace(/\/[^\/]*$/, `/${id}`)
}

export const isPrintPage = () => {
  return window.location.pathname.replace(/\/+$/, '') === '/print'
}
