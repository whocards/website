/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
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
        hero: 'url(/images/background.svg)',
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        'dm-sans': ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
