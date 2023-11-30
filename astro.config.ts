import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import {defineConfig} from 'astro/config'
import {IS_PROD, SITE_URL as site} from './src/constants/env'

import netlify from '@astrojs/netlify'
import nodejs from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  site,
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  integrations: [solid(), tailwind(), mdx(), sitemap(), robotsTxt()],
  output: 'hybrid',
  adapter: IS_PROD ? netlify() : nodejs({mode: 'standalone'}),
  redirects: {
    '/preorder': {
      status: 301,
      destination: '/gift',
    },
  },
})
