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
import { expect, test } from '@playwright/test';

/* test imports */
import { HomePage } from './home-page';
import { logInParameters, registerPendingAccountParameters, resetPasswordParameters } from './home-page.parameters';

test.describe('Home page functionality testing', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToNoAuthHomePage();
  });

  registerPendingAccountParameters.forEach(({ firstName, lastName, email, institute, role }) => {
    test(`should register a pending account form with ${email} address`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.verifyFormSectionElement();

      await homePage.createAccountButton.click();
      await homePage.fillInRegisterPendingAccountForm({ firstName, lastName, email, institute, role });

      homePage.page.on('dialog', (dialog) => dialog.accept());
    });
  });

  logInParameters.forEach(({ email, password, userType }) => {
    test(`should log in with ${userType} account type`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.verifyFormSectionElement();

      await homePage.fillInLoginForm({ email, password });
      await expect(page).toHaveURL(/.*dashboard/);
    });
  });

  resetPasswordParameters.forEach(({ email, userType }) => {
    test(`should send a reset password request with ${userType} account type`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.verifyFormSectionElement();

      await homePage.resetPasswordButton.click();
      await homePage.fillInForgottenPasswordForm({ email });
    });
  });
});
