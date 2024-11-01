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
  ui: {
    messages: {
      PAGE_LOADING: 'The application is fetching the necessary data for the form submission...',
      FORM_LOADING: 'Your registration is being submitted.',
    },
    form: {
      INSTRUCTION: 'Register an account if you are not in our system yet.',
      FIRST_NAME_LABEL: 'First Name',
      FIRST_NAME_PLACEHOLDER: 'Enter your first name(s)',
      LAST_NAME_LABEL: 'Last Name',
      LAST_NAME_PLACEHOLDER: 'Enter your last name(s)',
      EMAIL_PLACEHOLDER: 'Enter your email address',
      EMAIL_LABEL: 'Email',
      SUBMIT: 'register',
    },
  },
  validation: {
    FIRST_NAME_REQUIRED: 'Providing your first name is required.',
    FIRST_NAME_PATTERN: 'Use only letters, spaces or hyphens. Provide a minimum of 2 and a maximum of 100 characters.',
    LAST_NAME_REQUIRED: 'Providing your last name is required.',
    LAST_NAME_PATTERN: 'Use only letters, spaces or hyphens. Provide a minimum of 2 and a maximum of 100 characters.',
    EMAIL_REQUIRED: 'Providing your email address is required.',
    ACCOUNT_ROLE_REQUIRED: 'Selecting an account role is required.',
    INSTITUTION_REQUIRED: 'Selecting an institution is required.',
  },
};
