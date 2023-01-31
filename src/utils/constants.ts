export let DATA_URL: string

try {
  DATA_URL = import.meta.env.DATA_URL // astro
} catch (error) {
  DATA_URL = process.env.DATA_URL! // netlify
}

if (!DATA_URL) {
  throw Error('DATA_URL failed to load')
}

export const BASE_URL =
  process.env.DEPLOY_PRIME_URL || process.env.URL || import.meta.env.URL
