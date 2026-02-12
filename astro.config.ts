import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import {defineConfig, passthroughImageService} from 'astro/config'
import {SITE_URL as site} from './src/constants/env'

// https://astro.build/config
export default defineConfig({
  site,
  build: {
    format: 'file',
  },
  image: {
    service: passthroughImageService(),
  },
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    robotsTxt(),
    react({experimentalReactChildren: true}),
    icon({
      include: {
        mdi: ['twitter', 'linkedin', 'instagram', 'github', 'email'],
        'fa-solid': ['clone', 'external-link-alt'],
        ic: [
          'outline-arrow-back',
          'outline-arrow-forward',
          'baseline-email',
          'twotone-share',
          'round-close',
        ],
        ri: ['facebook-fill'],
        zondicons: ['checkmark'],
        'entypo-social': ['facebook'],
      },
    }),
  ],
  output: 'hybrid',
  adapter: netlify(),
  redirects: {
    '/preorder': '/contact',
    '/gift': '/contact',
  },
})
