import {
  type Locator,
  type Page,
  expect,
} from '@playwright/test';

type LoginFormT = {
  firstName: string;
  lastName: string;
  email: string;
  institute: number;
  role: number;
}

export class HomePage {
  readonly page: Page;
  readonly formSection: Locator;
  readonly createAccountButton: Locator;
  readonly loginButton: Locator;
  readonly forgottenPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formSection = page.locator('main > section');
    this.createAccountButton = page.getByRole('button', { name: 'Create account' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.forgottenPasswordButton = page.getByRole('button', { name: 'Forgot password?' });
  }

  goToNoAuthHomePage = async () => {
    await this.page.goto('/');
  };

  verifyFormSectionElement = async () => {
    await expect(this.formSection).toBeVisible();
  };

  registerPendingAccount = async ({ firstName, lastName, email, institute, role }: LoginFormT) => {
    await this.page.getByLabel('First Name').fill(firstName);
    await this.page.getByLabel('Last Name').fill(lastName);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Institution').selectOption({ index: institute });
    await this.page.getByLabel('Account Type').selectOption({ index: role });

    await this.page.getByRole('button', { name: 'register' }).click();
  };
}
