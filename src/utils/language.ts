import {DEFAULT_LANGUAGE} from '~utils/constants'
import type {Language} from '~types'
import languages from '~data/languages.json'

const langs = Object.keys(languages)

export const getBrowserLang = (): Language => {
  const key = ((navigator.languages && navigator.languages[0]) || navigator.language).toLowerCase()

  let res = ''

  if (langs.includes(key)) res = key
  if (langs.includes(key.split('-')[0])) res = key.split('-')[0]
  if (langs.includes(key.split('_')[0])) res = key.split('_')[0]

  return (res || DEFAULT_LANGUAGE) as Language
}

/**
 *
 */
export const getCurrentLanguage = (url: string): Language => {
  return (url.replace(/^\//, '').split('/')[0] as Language) || DEFAULT_LANGUAGE
}
