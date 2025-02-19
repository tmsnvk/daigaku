/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { test } from '@playwright/test';

/* test imports */
import { NewApplicationPage } from './new-application-page';
import { newApplicationParameters } from './new-application-page.parameters';

test.describe('New Application form tests', () => {
  newApplicationParameters.forEach(({ country, university, courseName, minorSubject, programmeLength }) => {
    test(`should submit a new application with ${courseName} course name`, async ({ page }) => {
      const newApplicationPage = new NewApplicationPage(page);

      await newApplicationPage.goToNewApplicationPage();
      await newApplicationPage.verifyFormElement();

      await newApplicationPage.fillInNewApplicationForm({ country, university, courseName, minorSubject, programmeLength });
    });
  });
});
