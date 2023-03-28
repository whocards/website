/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly PUBLIC_AMPLITUDE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
