import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  { label: 'Accueil', path: '/' },
  { label: 'Réalisations', path: '/realisations' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Méthode', path: '/methode' },
]

for (const { label, path } of routes) {
  test(`A11y WCAG 2.1 AA — ${label}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    if (results.violations.length > 0) {
      const summary = results.violations.map(v =>
        `[${v.impact}] ${v.id}: ${v.description}\n  → ${v.nodes.map(n => n.target).join(', ')}`
      ).join('\n')
      expect.soft(results.violations, `Violations WCAG sur ${label}:\n${summary}`).toHaveLength(0)
    }

    expect(results.violations).toHaveLength(0)
  })
}
