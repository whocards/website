// @ts-check
import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solid from '@astrojs/solid-js'
import image from '@astrojs/image'
// import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import {SITE_URL} from './scripts/env'
import sanity from 'astro-sanity'
import {env} from './src/utils/env'

// validate environment variables
await import('./src/utils/env')

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  integrations: [
    solid(),
    tailwind(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    // mdx(),
    sitemap(),
    sanity({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: '2023-02-08',
    }),
  ],
})
