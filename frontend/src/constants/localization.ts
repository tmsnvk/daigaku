/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const localization = {
  APPLICATION: {
    METADATA: {
      SUBMISSION: {
        AT: 'Submitted at:',
        BY: 'Submitted by:',
      },
      LAST_UPDATE: {
        AT: 'Last updated at:',
        BY: 'Last modified by:',
      },
    },
  },
  LAYOUT: {
    PUBLIC_LAYOUT: {
      ROUTES: {
        CONTACT_US: {
          LABEL: 'Contact us',
        },
      },
    },
    PRIVATE_LAYOUT: {
      NOTIFICATIONS: {
        LOADING_TEXT: 'The application is compiling your data...',
      },
      ROUTES: {
        SHARED: {
          DASHBOARD: {
            LABEL: 'Dashboard',
          },
          LOG_OUT: {
            LABEL: 'Log Out',
          },
          MY_ACCOUNT: {
            LABEL: 'My Account',
          },
          MESSAGES: {
            LABEL: 'Messages',
          },
          FEEDBACK: {
            LABEL: 'Feedback',
          },
        },
        STUDENT: {
          NEW_APPLICATION: {
            LABEL: 'New Application',
          },
          MY_APPLICATIONS: {
            LABEL: 'My Applications',
          },
        },
        MENTOR: {
          MY_STUDENTS: {
            LABEL: 'My Students',
          },
          MY_STUDENT_APPLICATIONS: {
            LABEL: 'My Student Applications',
          },
        },
        INSTITUTION_ADMIN: {
          // Placeholder for future constants.
        },
        SYSTEM_ADMIN: {
          ALL_STUDENTS: {
            LABEL: 'All Students',
          },
          ALL_MENTORS: {
            LABEL: 'All Mentors',
          },
          ALL_APPLICATIONS: {
            LABEL: 'All Applications',
          },
          SYSTEM: {
            LABEL: 'System',
          },
        },
      },
    },
    FOOTER: {
      INIT_YEAR: 2024,
      CONTENT: '© built with reactjs, spring boot, rabbitmq, redis, psql and ❤️',
    },
  },
  PAGES: {
    COMMON: {
      APPLICATION_EDIT: {
        NOTIFICATIONS: {
          PAGE_LOADING: 'The application is compiling your data...',
          APPLICATION_LOADING: 'Your application is being updated.',
          APPLICATION_SUBMIT: 'update application',
          ERRORS: {
            FIRM_CHOICE_SELECTION: "Only one of your applications may be set to 'Firm  Choice' status.",
            FINAL_DESTINATION_SELECTION:
              "Only one of your applications may be set to 'Final Destination' or 'Final Destination (Deferred Entry)' status.",
          },
        },
        FORM: {
          TITLE: 'Update Application Form',
          INFORMATION: [
            'Review your application and update its fields once you have received decisions / information from the university.',
            "You are not able to edit the course name, university and country fields as your application is considered final. If you have submitted this application by mistake with incorrect data, mark it for deletion and your mentor will review it. If you have changed your mind about the application, set its Application Status to 'Withdrawn'. This rule is in place for statistical reasons.",
            "Let your mentor know if you have any questions with the application. If you have any issues with the site or form, reach out to our team using the 'Feedback' form.",
          ],
          SUBMISSION: 'Your application was successfully updated.',
          FIELDS: {
            COUNTRY: {
              NAME: 'Country',
              INFORMATION: ['The country of your choice.'],
            },
            UNIVERSITY: {
              NAME: 'University',
              INFORMATION: ['The university of your choice.'],
            },
            COURSE_NAME: {
              NAME: 'Course Name',
              INFORMATION: ['The course of your choice.'],
            },
            MINOR_SUBJECT: {
              NAME: 'Minor Subject',
              INFORMATION: ['The minor subject of your choice (if any).'],
            },
            PROGRAMME_LENGTH: {
              NAME: 'Programme Length',
              INFORMATION: ['The length (years) of your chosen course.'],
            },
            APPLICATION_STATUS: {
              NAME: 'Application Status',
              SELECT_PROMPT: "Update the application's current status.",
              INFORMATION: [
                `Update the application status to:
                  (1) 'Submitted' once you have submitted it via the university's submission portal.
                  (2) 'Withdrawn' if you have decided not to move forward with the application.`,
              ],
            },
            INTERVIEW_STATUS: {
              NAME: 'Interview Status',
              SELECT_PROMPT: "Update the application's interview status.",
              INFORMATION: [
                'If this application process does not include an interview step, update the status accordingly.',
                'If an interview is part of the application process, update the field whether you are invited.',
              ],
            },
            OFFER_STATUS: {
              NAME: 'Offer Status',
              SELECT_PROMPT: "Update the university's decision.",
              INFORMATION: ["Update the university's response once you have received the final decision."],
            },
            RESPONSE_STATUS: {
              NAME: 'Response Status',
              SELECT_PROMPT: 'Update your response status.',
              INFORMATION: [
                'Update the field according to your preferred ranking.',
                'You may only have one Firm Choice as your number one target.',
              ],
            },
            FINAL_DESTINATION_STATUS: {
              NAME: 'Final Destination Status',
              SELECT_PROMPT: 'Update your final decision regarding this application.',
              INFORMATION: [
                'Update this final status once you have every necessary information.',
                `You may only have one Final Destination that is you accepted the university's offer.
                  The rest of your applications should be set to 'Not Final Destination'.`,
              ],
            },
          },
        },
        REMOVABLE_BUTTON: {
          DELETION_REQUEST: 'Request deletion',
          REVERT_REQUEST: 'Revert request',
        },
      },
      APPLICATION_VIEW: {
        PAGE_LOADING: 'The application is compiling your data...',
        EDIT_BUTTON: 'Edit',
        TITLE: 'View Application',
        FIELDS: {
          COUNTRY: {
            NAME: 'Country',
          },
          UNIVERSITY: {
            NAME: 'University',
          },
          COURSE_NAME: {
            NAME: 'Course Name',
          },
          MINOR_SUBJECT: {
            NAME: 'Minor Subject',
          },
          PROGRAMME_LENGTH: {
            NAME: 'Programme Length',
          },
          APPLICATION_STATUS: {
            NAME: 'Application Status',
          },
          INTERVIEW_STATUS: {
            NAME: 'Interview Status',
          },
          OFFER_STATUS: {
            NAME: 'Offer Status',
          },
          RESPONSE_STATUS: {
            NAME: 'Response Status',
          },
          FINAL_DESTINATION_STATUS: {
            NAME: 'Final Destination Status',
          },
        },
        COMMENTS: {
          PAGINATION: {
            PREVIOUS: 'Previous',
            NEXT: 'Next',
            PAGE: 'Page',
          },
          LOADING: 'Fetching comments...',
          ERROR:
            "There was an unexpected error and it is currently not possible to display the application's comments. Refresh your browser and if the error persists try again at a later time.",
          CREATE_COMMENT: {
            SUBMIT_LOADING: 'Your comment is being submitted.',
            SUBMIT_INPUT: 'Add Comment',
            FORM: {
              CONTENT: {
                LABEL: 'Write your comment',
                PLACEHOLDER: 'Write a comment...',
              },
            },
            VALIDATION: {
              REQUIRED_COMMENT: 'Add your comment.',
              PATTERN_COMMENT: 'Provide a minimum of 15 and a maximum of 1000 characters.',
            },
          },
        },
      },
      APPLICATIONS: {
        TABLE_HEADER: {
          LOADING: 'The application is compiling your data...',
          DOWNLOAD: {
            REQUEST: 'Handling your request...',
            TOAST: 'Your request has been received. You will receive an email soon with the details.',
          },
        },
        ROW_BUTTONS: {
          EDIT: 'Edit',
          VIEW: 'View',
        },
      },
      DASHBOARD: {
        PAGE_LOADING: 'The application is compiling your data...',
        TILE: {
          APPLICATIONS: 'Applications',
          PLANNED_APPLICATIONS: 'Planned Applications',
          SUBMITTED_APPLICATIONS: 'Submitted Applications',
          WITHDRAWN_APPLICATIONS: 'Withdrawn Applications',
          DISTINCT_COUNTRIES: 'Distinct Countries',
          DISTINCT_UNIVERSITIES: 'Distinct Universities',
          OFFERS: 'Offers',
          FIRM_CHOICE: 'Firm Choice',
          FINAL_DESTINATION: 'Final Destination',
          NOT_YET_SELECTED: 'Not yet selected',
        },
        TODO_LIST: {
          INTRODUCTION: [
            'Review your to-do list below. Keep in mind that nothing is urgent on this list!',
            'Certain items might only be fulfilled towards the end of your application period or school year.',
            'What is important is that you update your applications when you made any progress. You are the one responsible for minding your deadlines.',
            'Let your mentor know if you have any blocking issues, concerns or questions!',
            'Your current to-do items:',
          ],
          NO_APPLICATIONS:
            'You have not yet submitted any applications. If you have any blocking issues, get in touch with your mentor or school administrator.',
          NO_SUBMITTED_APPLICATIONS:
            "You currently have only 'Planned' applications. Make sure to submit your applications once your deadlines are closing in.",
          NO_INTERVIEW_SET: 'You have not yet updated the interview status of any of your applications.',
          NO_FIRM_CHOICE_SET: 'You have not yet indicated your firm choice.',
          NO_OFFER_SET: 'You have not yet indicated whether you have received any offers.',
          NO_FINAL_DESTINATION_SET: 'You have not yet indicated your final destination.',
          EMPTY_TODO_LIST: 'You have no items on your to-do list.',
        },
      },
      HOME: {
        BUTTONS: {
          LOGIN: 'Log in',
          REGISTRATION: 'Create account',
          RESET: 'Forgot password?',
        },
        NOTIFICATIONS: {
          REGISTRATION: 'Thank you for registering your account. You will soon receive an email with further details.',
          RESET: 'Your password has been reset. You will soon receive an email with further instructions.',
        },
        LOGIN: {
          MESSAGES: {
            PAGE_LOADING: 'You are being logged in.',
          },
          FORM: {
            HEADER: 'Sign in if you already have an admin-approved account, otherwise, apply for one first.',
            EMAIL: {
              PLACEHOLDER: 'Enter your email address',
              LABEL: 'Email',
              VALIDATION: {
                REQUIRED: 'Providing your email address is required.',
              },
            },
            PASSWORD: {
              PLACEHOLDER: 'Enter your password',
              LABEL: 'Password',
              VALIDATION: {
                REQUIRED: 'Providing your password is required.',
              },
            },
            SUBMIT: 'sign in',
          },
        },
        PENDING_ACCOUNT_REGISTRATION: {
          MESSAGES: {
            PAGE_LOADING: 'The application is fetching the necessary data for the form submission...',
            FORM_LOADING: 'Your registration is being submitted.',
          },
          FORM: {
            HEADER: 'Register an account if you are not in our system yet.',
            FIRST_NAME: {
              LABEL: 'First Name',
              PLACEHOLDER: 'Enter your first name(s)',
              VALIDATION: {
                REQUIRED: 'Providing your first name is required.',
                PATTERN: 'Use only letters, spaces or hyphens. Provide a minimum of 2 and a maximum of 100 characters.',
              },
            },
            LAST_NAME: {
              LABEL: 'Last Name',
              PLACEHOLDER: 'Enter your last name(s)',
              VALIDATION: {
                REQUIRED: 'Providing your last name is required.',
                PATTERN: 'Use only letters, spaces or hyphens. Provide a minimum of 2 and a maximum of 100 characters.',
              },
            },
            EMAIL: {
              LABEL: 'Email',
              PLACEHOLDER: 'Enter your email address',
              VALIDATION: {
                REQUIRED: 'Providing your email address is required.',
              },
            },
            ACCOUNT_ROLE: {
              VALIDATION: {
                REQUIRED: 'Selecting an account role is required.',
              },
            },
            INSTITUTION: {
              VALIDATION: {
                REQUIRED: 'Selecting an institution is required.',
              },
            },
            SUBMIT: 'register',
          },
        },
        PASSWORD_RESET: {
          MESSAGES: {
            FORM_LOADING: 'Your registration is being handled.',
          },
          FORM: {
            HEADER:
              'Request a password reset if you have forgotten your password. Do not request a reset if your account is not yet activated.',
            EMAIL: {
              LABEL: 'Email',
              PLACEHOLDER: 'Enter your email address',
              VALIDATION: {
                REQUIRED: 'Providing your email address is required.',
              },
            },
          },
          SUBMIT: 'reset',
        },
      },
    },
    STUDENT: {
      NEW_APPLICATION: {
        MESSAGES: {
          PAGE_LOADING: 'The application is fetching the necessary data for the form submission...',
          FORM_SUBMIT_LOADING: 'Your application is being submitted.',
          UNIVERSITY_LOADING: 'Fetching university list...',
          SUCCESS_TOAST: 'Your submission was successful. Wishing you the best of luck with your application!',
        },
        FORM: {
          TITLE: 'New Application Form',
          INFORMATION: [
            'Fill in all mandatory fields before submitting the application.',
            'Upon visiting the Applications page, you will find more fields to fill in for each of your submitted applications.',
            'Make sure to come back in the following months and properly update their statuses.',
            'Once you have submitted an application, you will not be able to change the country, university and course fields.',
            'Submit an application only if you are committed to it.',
            "If you do not find your selected country or university in the dropdown lists, reach out to an admin via the 'Feedback' form.",
          ],
          SUBMIT: 'submit application',
          COUNTRY: {
            INFORMATION: [
              'The first step of your application process is selecting the country of your choice.',
              'You are not able to select your chosen university until you have selected its home country.',
              `If you do not see the country of your choice amongst the selectOptions,
              reach out to our admin team using the form under the Contact Us page.`,
            ],
            VALIDATION: {
              REQUIRED: 'Selecting a country is required.',
            },
          },
          UNIVERSITY: {
            INFORMATION: [
              'Once you have selected a country, you will be able to pick any universities of that country from the dropdown selectOptions.',
              `If you do not see the university of your choice amongst the selectOptions,
              reach out to our admin team using the form under the Contact Us page.`,
            ],
            VALIDATION: {
              REQUIRED: 'Selecting a university is required.',
            },
          },
          COURSE_NAME: {
            LABEL: 'Course name',
            PLACEHOLDER: 'Provide the course of your choice.',
            INFORMATION: [
              'Enter the full name of the course you plan to apply to.',
              'For example, Cognitive Science or Economics and Business Administration.',
            ],
            VALIDATION: {
              REQUIRED: 'Providing the name of your selected course is required.',
              PATTERN: 'Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.',
            },
          },
          MINOR_SUBJECT: {
            LABEL: 'Minor Subject',
            PLACEHOLDER: 'Provide your minor course.',
            INFORMATION: [
              'Enter the full name of the minor course that accompanies your major course.',
              'Leave the input box empty if you have no minor course.',
            ],
            VALIDATION: {
              PATTERN:
                'Providing a minor subject is optional but use only letters, spaces and a minimum of 5 and a maximum of 255 characters if you do so.',
            },
          },
          PROGRAMME_LENGTH: {
            LABEL: 'Programme Length',
            INFORMATION: [
              'Enter the length of your selected course (years).',
              'By default, the value is set to 3 years, update it only if it is different for you.',
            ],
            VALIDATION: {
              REQUIRED: 'Providing the length of your selected course is required.',
              PATTERN: 'You may enter numeric values only between 2 and 5.',
            },
          },
        },
      },
    },
    MENTOR: {},
    INSTITUTION_ADMIN: {},
    SYSTEM_ADMIN: {},
  },
  COMPONENTS: {
    FORM: {
      ACCOUNT_ROLE_DROPDOWN: {
        LABEL: 'Account Type',
        DEFAULT_OPTION: 'Select your account type.',
      },
      COUNTRY_DROPDOWN: {
        LABEL: 'Country',
        DEFAULT_OPTION: 'Select the country of your choice.',
      },
      INSTITUITON_DROPDOWN: {
        LABEL: 'Institution',
        DEFAULT_OPTION: 'Select the institution you currently attend.',
      },
      UNIVERSITY_DROPDOWN: {
        LABEL: 'University',
        DEFAULT_OPTION: 'Select the university of your choice.',
      },
    },
    NOTIFICATION: {
      MODAL: {
        CONFIRMATION: {
          ACCEPTANCE: 'ok',
        },
        ERROR: {
          MESSAGE: ['The application has encountered an unexpected error.', 'Refresh your browser and try again.'],
          ACCEPTANCE: 'ok',
        },
      },
    },
  },
};
