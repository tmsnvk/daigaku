/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';

/* test imports */
import { HomePage } from '../pages/home-page/home-page';

dotenv.config({ path: '../../.env' });

setup('Create Student role authentication state', async ({ page, context }) => {
  const homePage = new HomePage(page);

  await homePage.goToNoAuthHomePage();
  await homePage.fillInLoginForm({
    email: process.env.PLAYWRIGHT_STUDENT_EMAIL as string,
    password: process.env.PLAYWRIGHT_STUDENT_PASSWORD as string,
  });

  await page.waitForURL('**/dashboard');

  await context.storageState({ path: process.env.PLAYWRIGHT_STUDENT_AUTH_STATE_PATH });
});
