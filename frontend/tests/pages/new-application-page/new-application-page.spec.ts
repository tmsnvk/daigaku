import { test } from '@playwright/test';
import { NewApplicationPage } from './new-application-page';

test.describe('Submit a new application form', () => {
  [
    { country: 1, university: 0, courseName: 'Test Course Name', minorSubject: 'Test Minor Name', programmeLength: '3' },
    { country: 1, university: 0, courseName: 'Another Test Course Name' },
  ].forEach(({ country, university, courseName, minorSubject, programmeLength }) => {
    test(`with ${courseName} course name`, async ({ page }) => {
      const newApplicationPage = new NewApplicationPage(page);

      await newApplicationPage.goToNewApplicationPage();
      await newApplicationPage.verifyFormElement();

      await newApplicationPage.fillInNewApplicationForm({ country, university, courseName, minorSubject, programmeLength });
    });
  });
});
