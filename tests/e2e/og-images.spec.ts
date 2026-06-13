import {expect, test} from '@playwright/test'

// Social / Open Graph metadata (rendered by src/layouts/Head.astro):
//   - every page exposes og:image and twitter:image
//   - question pages point og:image at the committed /images/{lang}/{id}.png
//   - other pages fall back to /social.png
//   - the referenced image URL must resolve (HTTP 200 + image/* content-type)
//
// SITE_URL defaults to http://localhost:4321 for non-prod builds, so the meta
// hold absolute URLs against this origin; the e2e server runs on 4321 so they
// resolve back to it.

const sample = [
  {path: '/', expectImage: /\/social\.png$/},
  {path: '/en/question/1', expectImage: /\/images\/en\/1\.png$/},
  {path: '/hu/question/1', expectImage: /\/images\/hu\/1\.png$/},
]

const metaContent = (page: import('@playwright/test').Page, property: string) =>
  page.locator(`meta[property="${property}"]`).getAttribute('content')

for (const {path, expectImage} of sample) {
  test(`${path} exposes resolvable og:image and twitter:image`, async ({page, request}) => {
    await page.goto(path)

    const ogImage = await metaContent(page, 'og:image')
    const twitterImage = await metaContent(page, 'twitter:image')

    expect(ogImage, 'og:image should be present').toBeTruthy()
    expect(twitterImage, 'twitter:image should be present').toBeTruthy()
    expect(ogImage!).toMatch(expectImage)
    // og and twitter images are the same source of truth.
    expect(twitterImage).toBe(ogImage)

    // The image URL must resolve to an actual image.
    const response = await request.get(ogImage!)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type'] || '').toMatch(/^image\//)
  })
}

// Placeholder for follow-up work. Code-generated card images (#44) replace the
// committed /images/{lang}/{id}.png files with dynamically generated ones, and
// the new /play screen (#41) introduces its own routes. Those each warrant
// dedicated OG/route coverage once they land in this branch.
test.fixme(
  'TODO(#44, #41): code-generated card images and the new /play screen get dedicated tests',
  async () => {
    // Intentionally unimplemented until #44 (generated card images) and
    // #41 (new /play screen) are merged. See tests/e2e/contact.spec.ts for the
    // current limitation around SSR routes under the static e2e server.
  }
)
