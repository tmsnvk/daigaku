/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFile: '.frontend//playwright-report/index.html' }]],
  webServer: {
    command: 'npm run dev:start',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:5173/',
  },
  use: {
    baseURL: 'http://localhost:5173/',
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'user-setup',
      testMatch: /auth\.setup\.ts/,
      fullyParallel: true,
    },
    {
      name: 'chromium ui tests',
      use: {
        ...devices['Desktop Chrome'],
        storageState: process.env.PLAYWRIGHT_STUDENT_AUTH_STATE_PATH,
      },
      dependencies: ['user-setup'],
    },
  ],
});
