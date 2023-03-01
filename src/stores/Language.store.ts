import type {Language} from '#types/Questions'
import {persistentAtom} from '@nanostores/persistent'
import {action, computed} from 'nanostores'
import languages from '~data/languages.json'

export const languageStore = persistentAtom<Language>('language', 'en')

export const setLanguage = action(
  languageStore,
  'setLanguage',
  (store, language: Language = 'en') => {
    languageStore.set(language)
  }
)

export const languageName = computed(languageStore, (lang) => languages[lang])
