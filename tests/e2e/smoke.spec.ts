import {expect, test} from '@playwright/test'

// Smoke: the landing page renders and the key statically-built routes return 200.
// SSR-only routes (/contact, /api/*) are intentionally excluded here — they are
// emitted as a Netlify function, not static files (see tests/static-server.mjs).

test('landing page renders', async ({page}) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)

  // Hero copy is stable, server-rendered content.
  await expect(page.getByRole('heading', {level: 1})).toContainText('Conversation')

  // Primary calls to action.
  await expect(page.getByRole('link', {name: 'Request Cards'}).first()).toBeVisible()

  // Document title comes from the shared Head.astro layout.
  await expect(page).toHaveTitle(/WhoCards/)
})

const staticRoutes = [
  '/',
  '/en',
  '/mission',
  '/print',
  '/images',
  '/en/question/1',
  '/hu/question/1',
  '/events/hajnalig',
  '/events/hajnalig/play',
]

for (const route of staticRoutes) {
  test(`route ${route} returns 200`, async ({request}) => {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
  })
}

test('unknown route serves the 404 page', async ({request}) => {
  const response = await request.get('/this-route-does-not-exist')
  expect(response.status()).toBe(404)
})
