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
import { type Locator, type Page, expect } from '@playwright/test';

type RegisterFormT = {
  firstName: string;
  lastName: string;
  email: string;
  institute: number;
  role: number;
};

type LoginFormT = {
  email: string;
  password: string;
};

type ForgottenPasswordFormT = {
  email: string;
};

export class HomePage {
  readonly page: Page;
  readonly formSection: Locator;
  readonly createAccountButton: Locator;
  readonly loginButton: Locator;
  readonly resetPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formSection = page.locator('main > section');
    this.createAccountButton = page.getByRole('button', { name: 'Create account' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.resetPasswordButton = page.getByRole('button', { name: 'Forgot password?' });
  }

  goToNoAuthHomePage = async () => {
    await this.page.goto('/');
  };

  verifyFormSectionElement = async () => {
    await expect(this.formSection).toBeVisible();
  };

  submitForm = async () => {
    await this.page.locator('[type=submit]').click();
  };

  fillInRegisterPendingAccountForm = async ({ firstName, lastName, email, institute, role }: RegisterFormT) => {
    await this.page.getByLabel('First Name').fill(firstName);
    await this.page.getByLabel('Last Name').fill(lastName);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Institution').selectOption({ index: institute });
    await this.page.getByLabel('Account Type').selectOption({ index: role });

    await this.submitForm();
  };

  fillInLoginForm = async ({ email, password }: LoginFormT) => {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);

    await this.submitForm();
  };

  fillInForgottenPasswordForm = async ({ email }: ForgottenPasswordFormT) => {
    await this.page.getByLabel('Email').fill(email);

    await this.submitForm();
  };
}
