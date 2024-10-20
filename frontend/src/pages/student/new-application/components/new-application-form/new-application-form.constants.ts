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

/**
 * @since 0.0.1
 */
export const constants = {
  pageMessage: {
    LOADING: 'The application is fetching the necessary data for the form submission...',
  },
  uiMessage: {
    FORM_INSTRUCTION: 'Register an account if you are not in our system yet.',
    LOADING: 'Your application is being submitted.',
    UNIVERSITY_LOADING: 'Fetching university list...',
    SUCCESS_TOAST: 'Your submission was successful. Wishing you the best of luck with your application!',
  },
  form: {
    TITLE: 'New Application Form',
    INFORMATION: [
      'Fill in all mandatory fields before submitting the application.',
      'Upon visiting the Applications page, you will find more fields to fill in for each of your submitted applications.',
      'Make sure to come back in the following months and properly update their statuses.',
      'Once you have submitted an application, you will not be able to change the country, university and course fields.',
      'Submit an application only if you are committed to it.',
      `If you do not find your selected country or university in the dropdown lists, reach out to an admin via the 'Feedback' form.`,
    ],
    SUBMIT: 'submit application',
    country: {
      INFORMATION: [
        'The first step of your application process is selecting the country of your choice.',
        'You are not able to select your chosen university until you have selected its home country.',
        'If you do not see the country of your choice amongst the selectOptions, reach out to our admin team using the form under the Contact Us page.',
      ],
    },
    university: {
      INFORMATION: [
        'Once you have selected a country, you will be able to pick any universities of that country from the dropdown selectOptions.',
        'If you do not see the university of your choice amongst the selectOptions, reach out to our admin team using the form under the Contact Us page.',
      ],
    },
    courseName: {
      LABEL: 'Course name',
      PLACEHOLDER: 'Provide the course of your choice.',
      INFORMATION: [
        'Enter the full name of the course you plan to apply to.',
        'For example, Cognitive Science or Economics and Business Administration.',
      ],
    },
    minorSubject: {
      LABEL: 'Minor Subject',
      PLACEHOLDER: 'Provide your minor course.',
      INFORMATION: [
        'Enter the full name of the minor course that accompanies your major course.',
        'Leave the input box empty if you have no minor course.',
      ],
    },
    programmeLength: {
      LABEL: 'Programme Length',
      INFORMATION: [
        'Enter the length of your selected course (years).',
        'By default, the value is set to 3 years, update it only if it is different for you.',
      ],
    },
  },
  validation: {
    country: {
      REQUIRED: 'Selecting a country is required.',
    },
    university: {
      REQUIRED: 'Selecting a university is required.',
    },
    courseName: {
      REQUIRED: 'Providing the name of your selected course is required.',
      PATTERN: 'Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.',
    },
    minorSubject: {
      PATTERN:
        'Providing a minor subject is optional but use only letters, spaces and a minimum of 5 and a maximum of 255 characters if you do so.',
    },
    programmeLength: {
      REQUIRED: 'Providing the length of your selected course is required.',
      PATTERN: 'You may enter numeric values only between 2 and 5.',
    },
  },
};
