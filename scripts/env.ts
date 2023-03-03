import dotEnv from 'dotenv'

dotEnv.config()

const localhost = 'http://localhost:3000'

const hasProcess = typeof process !== undefined

export let SITE_URL: string = localhost

let NETLIFY_URL: string | undefined

if (hasProcess && process.env.NETLIFY) {
  SITE_URL = (
    process.env.CONTEXT === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL
  )!
}

if (!SITE_URL) {
  throw Error(`env vars messed up ${SITE_URL}`)
}
