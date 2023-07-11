/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    breakpointsInspector: {
      position: ['bottom', 'left'],
      prefix: '',
      width: 50,
    },
    extend: {
      colors: {
        yellow: {
          100: '#7E7552',
          200: '#FFE37E',
          400: '#F9D75F',
          500: '#FFC700',
        },
        gray: '#65636E',
        dark: '#262433',
        darker: '#111516',
        white: '#F5F5F5',
        primary: {
          light: '#F9D75F',
          dark: '#C058D2',
        },
      },
      backgroundImage: {
        hero: 'url(/background.svg)',
      },
      fontFamily: {
        sans: ['golos-text', ...defaultTheme.fontFamily.sans],
        title: ['aptly', ...defaultTheme.fontFamily.sans],
        chinese: ['noto-sans-chinese', ...defaultTheme.fontFamily.sans],
        hebrew: ['noto-sans-hebrew', ...defaultTheme.fontFamily.sans],
        japanese: ['noto-sans-japanese', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        question: '1fr min-content',
      },
      screens: {
        'phone-landscape': {
          raw: 'only screen and (min-device-width: 480px) and (max-device-width: 960px) and (orientation: portrait)',
        },
        short: {
          raw: '(max-height: 500px)',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
    logs: false,
  },
}
