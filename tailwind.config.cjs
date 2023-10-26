const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    breakpointsInspector: {
      position: ['bottom', 'left'],
      prefix: '',
      width: 50,
    },
    extend: {
      spacing: {
        4.5: '1.125rem',
        7.5: '1.875rem',
      },
      rounded: {
        '2.5xl': '1.25rem',
      },
      colors: {
        yellow: {
          100: '#7E7552',
          200: '#FFE37E',
          400: '#F9D75F',
          500: '#F6C944',
        },
        gray: {
          DEFAULT: '#65636E',
          lighter: '#DCDEE9',
          light: '#474A69',
          dark: '#9698AF',
        },
        dark: '#262432',
        darker: '#111516',
        darkest: '#08001A',
        background: '#0A0018',
        white: '#F5F5F5',
        red: '#EE1E23',
        primary: {
          light: '#F9D75F',
          dark: '#C058D2',
        },
      },
      backgroundImage: (theme) => ({
        hero: 'url(/background.svg)',
        'gradient-primary': `linear-gradient(to bottom left, ${theme(
          'colors.primary.dark'
        )} 25%, ${theme('colors.primary.light')} 92%)`,
      }),
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
        xs: {
          raw: '(max-width: 320px)',
        },
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
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
    logs: false,
  },
}
