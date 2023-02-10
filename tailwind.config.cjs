/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
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
        sans: ['NunitoVariable', 'Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
