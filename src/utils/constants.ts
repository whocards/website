import type {Language} from '#types/Questions'

export let BASE_URL: string

try {
  BASE_URL = import.meta.env.URL!
} catch (error) {
  BASE_URL = (process.env.DEPLOY_PRIME_URL || process.env.URL)!
}

export const DEFAULT_LANGUAGE: Language = 'en'
