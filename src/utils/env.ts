import dotEnv from 'dotenv'

dotEnv.config()

export const NETLIFY_URL =
  process.env.CONTEXT === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL

export const SITE_URL = process.env.NETLIFY ? NETLIFY_URL : 'http://localhost:3000'

export const AMPLITUDE_API_KEY = import.meta.env.AMPLITUDE_API_KEY
