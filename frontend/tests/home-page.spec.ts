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
      await homePage.registerPendingAccount({ firstName, lastName, email, institute, role });

      homePage.page.on('dialog', (dialog) => dialog.accept());
    });
  });

  test('the login form ', () => {

  });
});
