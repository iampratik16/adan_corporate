import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke, accessibility and resilience tests across three engines.
 *
 * Runs against a production build, not the dev server: the dev server serves
 * unminified bundles and skips the static optimisation the budgets depend on,
 * so testing it would measure the wrong thing.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3111',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'pnpm build && pnpm start -p 3111',
        url: 'http://localhost:3111',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
