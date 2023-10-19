import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import {defineConfig} from 'astro/config'
import {SITE_URL as site} from './src/constants/env'

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [solid(), tailwind(), mdx(), sitemap(), robotsTxt()],
})
