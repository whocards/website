// @ts-check
import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solid from '@astrojs/solid-js'
import image from '@astrojs/image'
// import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import {SITE_URL} from './scripts/env'

import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true,
  },
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
    robotsTxt(),
  ],
})
