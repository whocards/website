module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  bracketSpacing: false,
  jsxSingleQuote: true,
  printWidth: 100,
  plugins: [require('prettier-plugin-tailwindcss'), require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
