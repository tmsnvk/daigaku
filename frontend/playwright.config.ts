/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
  ],
});
