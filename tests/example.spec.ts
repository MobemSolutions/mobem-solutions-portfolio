import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Mobem/)
})

test('opengraph-image returns a valid image', async ({ request }) => {
  const response = await request.get('/opengraph-image')
  expect(response.status()).toBe(200)
  const contentType = response.headers()['content-type']
  expect(contentType).toMatch(/^image\//)
})

test('logo navigates correctly from inner page', async ({ page }) => {
  await page.goto('/realisations')
  await page.click('a[aria-label*="Mobem Solutions"]')
  await expect(page).toHaveURL('/')
})
