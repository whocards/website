// @ts-check
import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solid from '@astrojs/solid-js'
// import image from '@astrojs/image'
// import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import {SITE_URL} from './scripts/env'

// https://astro.build/config
export default defineConfig({
  experimental: {
    redirects: true,
  },
  redirects: {
    '/js/scripts': 'https://plausible.io/js/script.js',
    '/api/event': 'https://plausible.io/api/event',
  },
  site: SITE_URL,
  trailingSlash: 'never',
  integrations: [
    solid(),
    tailwind(),
    // image({
    //   serviceEntryPoint: '@astrojs/image/sharp',
    // }),
    // mdx(),
    sitemap(),
  ],
})
