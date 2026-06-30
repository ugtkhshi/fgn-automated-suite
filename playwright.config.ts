import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testIgnore: ['tests/saveAuthStates.spec.ts'],
  timeout: 30_000,
  workers: 1,
  expect: { timeout: 5000 },
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 }
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});

