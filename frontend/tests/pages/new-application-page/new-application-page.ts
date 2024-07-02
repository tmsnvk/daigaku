import {
  type Locator,
  type Page,
  expect,
} from '@playwright/test';

type NewApplicationFormT = {
  country: number;
  university: number;
  courseName: string;
  minorSubject?: string;
  programmeLength?: string;
}

export class NewApplicationPage {
  readonly page: Page;
  readonly formElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formElement = page.locator('main > form');
  }

  goToNewApplicationPage = async () => {
    await this.page.goto('/new-application');
  };

  verifyFormElement = async () => {
    await expect(this.formElement).toBeVisible();
  };

  fillInNewApplicationForm = async ({ country, university, courseName, minorSubject, programmeLength }: NewApplicationFormT) => {
    await this.page.getByLabel('Country').selectOption({ index: country });
    await this.page.getByLabel('University').selectOption({ index: university });
    await this.page.getByLabel('Course name').fill(courseName);

    if (minorSubject) {
      await this.page.getByLabel('Minor subject').fill(minorSubject);
    }

    if (programmeLength) {
      await this.page.getByLabel('Programme length').fill(programmeLength);
    }

    await this.page.locator('[type=submit]').click();
  };
}
