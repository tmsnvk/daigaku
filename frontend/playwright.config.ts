import {
  defineConfig,
  devices,
} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: !process.env.CI,
    url: 'http://127.0.0.1:5173/',
  },
  use: {
    baseURL: 'http://127.0.0.1:5173/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'global-setup',
      testMatch: /.*\.setup\.ts/,
      fullyParallel: true,
    },
    {
      name: 'chromium ui tests',
      use: {
        ...devices['Desktop Chrome'],
        storageState: process.env.PLAYWRIGHT_STUDENT_AUTH_STATE_PATH,
      },
      dependencies: ['global-setup'],
    },
    {
      name: 'firefox ui tests',
      use: {
        ...devices['Desktop Firefox'],
        storageState: process.env.PLAYWRIGHT_STUDENT_AUTH_STATE_PATH,
      },
      dependencies: ['global-setup'],
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
