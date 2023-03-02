/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly URL?: string
  readonly AMPLITUDE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
