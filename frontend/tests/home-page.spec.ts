import {
  expect,
  test,
} from '@playwright/test';
import { HomePage } from './pages/home-page';

test.describe('Test the form functionality of', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToNoAuthHomePage();
  });

  [
    { firstName: 'Student', lastName: 'User', email: 'new@student.net', institute: 1, role: 1 },
    { firstName: 'Mentor', lastName: 'User', email: 'new@mentor.net', institute: 1, role: 0 },
  ].forEach(({ firstName, lastName, email, institute, role }) => {
    test(`the register pending account form with ${email} address`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.verifyFormSectionElement();

      await homePage.createAccountButton.click();
      await homePage.fillInRegisterPendingAccountForm({ firstName, lastName, email, institute, role });

      homePage.page.on('dialog', (dialog) => dialog.accept());
    });
  });

  [
    { email: 'student@test.net', password: '1', userType: 'student' },
    { email: 'mentor@test.net', password: '1', userType: 'mentor' },
    { email: 'insadmin@test.net', password: '1', userType: 'institution admin' },
    { email: 'sysadmin@test.net', password: '1', userType: 'system admin' },
  ].forEach(({ email, password, userType }) => {
    test(`the login form with ${userType} account type`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.verifyFormSectionElement();

      await homePage.fillInLoginForm({ email, password });
      await expect(page).toHaveURL(/.*dashboard/);
    });
  });

  [
    { email: 'student@test.net', userType: 'student' },
    { email: 'mentor@test.net', userType: 'mentor' },
    { email: 'insadmin@test.net', userType: 'institution admin' },
  ].forEach(({ email, userType }) => {
    test(`the forgotten password form with ${userType} account type`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.verifyFormSectionElement();

      await homePage.forgottenPasswordButton.click();
      await homePage.fillInForgottenPasswordForm({ email });
    });
  });
});
