import {idsStore} from '~stores/Game.store'
import type {QuestionId} from '~types'
import {DEFAULT_LANGUAGE, LANG_KEYS} from '~utils'

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

  if (!LANG_KEYS.includes(url)) {
    url = DEFAULT_LANGUAGE
  }
  // handle '/' route
  return `${window.location.origin}/${lang || url}/question/${idsStore.get().current}`
}

/**
 *
 */
export const getQuestionUrl = (id: QuestionId) => {
  if (!id) return ''

  if (window.location.pathname.startsWith('/play')) {
    return window.location.origin + '/en/question/' + id
  }

  if (window.location.pathname.endsWith('/play')) {
    return window.location.origin + window.location.pathname.split('/')[0] + '/question/' + id
  }

  return window.location.origin + getTrimmedPath().replace(/\/[^\/]*$/, `/${id}`)
}

export const isPrintPage = () => {
  return window.location.pathname.replace(/\/+$/, '') === '/print'
}
