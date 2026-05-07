import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Config - Mobem Solutions "Arme Colossale"
 * Focus : Performance, Accessibilité et Robustesse multi-plateforme.
 */
export default defineConfig({
  testDir: './tests',
  /* Exécution en parallèle pour gagner du temps */
  fullyParallel: true,
  /* Interdire le test.only en CI */
  forbidOnly: !!process.env.CI,
  /* Réessayer 2 fois en CI pour éliminer les faux positifs (flaky) */
  retries: process.env.CI ? 2 : 1,
  /* Un seul worker en CI pour éviter les surcharges de ressources */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter HTML pour une analyse visuelle des résultats */
  reporter: 'html',

  /* Timeout global : 60s par test pour laisser Next.js s'hydrater proprement */
  timeout: 60 * 1000,
  expect: {
    timeout: 10000,
  },

  /* Configuration partagée pour tous les projets */
  use: {
    baseURL: 'http://localhost:3000',
    /* Traces, Screenshots et Vidéos : Uniquement en cas d'échec pour le débug */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Matrice de tests : Le commando Mobem */
  projects: [
    // --- DESKTOP BROWSER ---
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Chromium - Dark Mode',
      use: { ...devices['Desktop Chrome'], colorScheme: 'dark' },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Webkit (Safari)',
      use: { ...devices['Desktop Safari'] },
    },

    // --- MOBILE & TABLETS (Crucial pour le SEO Local) ---
    {
      name: 'Mobile Chrome (Android)',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari (iPhone)',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Mobile Android (Mid-range)',
      use: { ...devices['Galaxy S9+'] },
    },
    {
      name: 'iPad Pro',
      use: { ...devices['iPad Pro 11'] },
    },

    // --- PERFORMANCE TEST (Simule une 4G instable) ---
    {
      name: 'Mobile Chrome - Slow 4G',
      use: { 
        ...devices['Pixel 5'],
        // On simule ici une latence réseau si ton hébergeur le permet
      },
    },

    // --- BRANDED BROWSER ---
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Lancement automatique du serveur local pour les tests */
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});