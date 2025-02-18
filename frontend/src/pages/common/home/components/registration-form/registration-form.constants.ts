/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const constants = {
  ui: {
    messages: {
      PAGE_LOADING: 'The application is fetching the necessary data for the form submission...',
      FORM_LOADING: 'Your registration is being submitted.',
    },
    form: {
      INSTRUCTION: 'Register an account if you are not in our system yet.',
      fields: {
        FIRST_NAME: {
          LABEL: 'First Name',
          PLACEHOLDER: 'Enter your first name(s)',
        },
        LAST_NAME: {
          LABEL: 'Last Name',
          PLACEHOLDER: 'Enter your last name(s)',
        },
        EMAIL: {
          LABEL: 'Email',
          PLACEHOLDER: 'Enter your email address',
        },
      },
      SUBMIT: 'register',
    },
  },
  validation: {
    FIRST_NAME: {
      REQUIRED: 'Providing your first name is required.',
      PATTERN: 'Use only letters, spaces or hyphens. Provide a minimum of 2 and a maximum of 100 characters.',
    },
    LAST_NAME: {
      REQUIRED: 'Providing your last name is required.',
      PATTERN: 'Use only letters, spaces or hyphens. Provide a minimum of 2 and a maximum of 100 characters.',
    },
    EMAIL: {
      REQUIRED: 'Providing your email address is required.',
    },
    ACCOUNT_ROLE: {
      REQUIRED: 'Selecting an account role is required.',
    },
    INSTITUTION: {
      REQUIRED: 'Selecting an institution is required.',
    },
  },
};
