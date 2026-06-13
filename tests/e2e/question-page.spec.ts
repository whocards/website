import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {expect, test} from '@playwright/test'

// Loaded via fs (rather than a JSON import) so the older repo Prettier/ESLint
// toolchain doesn't trip on import attributes.
const questions: Record<string, Record<string, string>> = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../src/data/questions.json', import.meta.url)), 'utf8')
)

// Per-question page: src/pages/[language]/question/[id].astro
//   - renders the question text for the [language]/[id] in an <h1>
//   - renders GameControls (#prev / #next anchors + a language button)
//   - GameControls wires #prev/#next hrefs to other /[lang]/question/<id> pages
//     (order is randomized client-side, so we assert the *shape* of navigation).

const q1en = questions['1'].en

test.beforeEach(async ({page}) => {
  await page.addInitScript(() => window.localStorage.clear())
})

test('renders the question text for /en/question/1', async ({page}) => {
  await page.goto('/en/question/1')
  await expect(page.getByRole('heading', {level: 1})).toHaveText(q1en)
})

test('renders GameControls', async ({page}) => {
  await page.goto('/en/question/1')

  await expect(page.locator('#prev')).toBeAttached()
  await expect(page.locator('#next')).toBeAttached()

  // Language button shows the current language code and is wired to open the modal.
  await expect(page.getByRole('button', {name: 'change language'})).toHaveText('en')
})

test('next control navigates to another question page', async ({page}) => {
  await page.goto('/en/question/1')

  const next = page.locator('#next')
  // GameControls populates the href client-side after hydration.
  await expect(next).toHaveAttribute('href', /\/en\/question\/\d+$/)

  await next.click()
  await expect(page).toHaveURL(/\/en\/question\/\d+$/)
  await expect(page.getByRole('heading', {level: 1})).not.toBeEmpty()
})
