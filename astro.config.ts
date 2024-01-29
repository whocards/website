import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import {defineConfig} from 'astro/config'
import {SITE_URL as site} from './src/constants/env'
import netlify from '@astrojs/netlify'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site,
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  integrations: [tailwind(), mdx(), sitemap(), robotsTxt(), react()],
  output: 'hybrid',
  adapter: netlify(),
  redirects: {
    '/preorder': '/gift',
  },
})
