// @ts-check
import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import {SITE_URL} from './scripts/env'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
    sitemap(),
  ],
})
