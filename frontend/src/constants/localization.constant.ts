/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const TranslationKey = {
  app: {
    layout: {
      navigation: {
        shared: {
          contactUs: 'contactUs',
          dashboard: 'dashboard',
          logOut: 'logOut',
          myAccount: 'myAccount',
          messages: 'messages',
          feedback: 'feedback',
        },
        student: {
          newApplication: 'newApplication',
          myApplications: 'myApplications',
        },
        mentor: {
          myStudents: 'myStudents',
          myStudentsApplications: 'myStudentsApplications',
        },
      },
      footer: {
        initYear: 'initYear',
        content: 'content',
      },
    },
    generic: {
      loading: {
        dataCompilation: 'dataCompilation',
        formSubmission: 'formSubmission',
        handlingRequest: 'handlingRequest',
      },
      toast: {
        successToastTitle: 'successToastTitle',
        serverErrorToastTitle: 'serverErrorToastTitle',
        serverErrorToastDescription: 'serverErrorToastDescription',
        unexpectedErrorToastTitle: 'unexpectedErrorToastTitle',
        unexpectedErrorToastDescription: 'unexpectedErrorToastDescription',
      },
      error: {
        tryAgain: 'tryAgain',
        queryFetchError: 'queryFetchError',
        unexpectedError: 'unexpectedError',
      },
    },
    component: {
      form: {
        countryLabel: 'countryLabel',
        countryPlaceholder: 'countryPlaceholder',
        universityLabel: 'universityLabel',
        universityPlaceholder: 'universityPlaceholder',
        courseNameLabel: 'courseNameLabel',
        courseNamePlaceholder: 'courseNamePlaceholder',
        minorSubjectLabel: 'minorSubjectLabel',
        minorSubjectPlaceholder: 'minorSubjectPlaceholder',
        programmeLengthLabel: 'programmeLengthLabel',
        applicationStatusLabel: 'applicationStatusLabel',
        applicationStatusPlaceholder: 'applicationStatusPlaceholder',
        interviewStatusLabel: 'interviewStatusLabel',
        interviewStatusPlaceholder: 'interviewStatusPlaceholder',
        offerStatusLabel: 'offerStatusLabel',
        offerStatusPlaceholder: 'offerStatusPlaceholder',
        responseStatusLabel: 'responseStatusLabel',
        responseStatusPlaceholder: 'responseStatusPlaceholder',
        finalDestinationStatusLabel: 'finalDestinationStatusLabel',
        finalDestinationStatusPlaceholder: 'finalDestinationStatusPlaceholder',
      },
    },
    page: {
      root: {
        selectorButtons: {
          logIn: 'logIn',
          registerPendingAccount: 'registerPendingAccount',
          resetPassword: 'resetPassword',
        },
        login: {
          form: {
            header: 'header',
            submitButton: 'submitButton',
            loadingText: 'loadingText',
            emailLabel: 'emailLabel',
            emailPlaceholder: 'emailPlaceholder',
            emailRequired: 'emailRequired',
            validEmailRequired: 'validEmailRequired',
            passwordLabel: 'passwordLabel',
            passwordPlaceholder: 'passwordPlaceholder',
            passwordRequired: 'passwordRequired',
          },
        },
        pendingAccountRegistration: {
          form: {
            header: 'header',
            submitButton: 'submitButton',
            loadingText: 'loadingText',
            firstNameLabel: 'firstNameLabel',
            firstNamePlaceholder: 'firstNamePlaceholder',
            firstNameRequired: 'firstNameRequired',
            lastNameLabel: 'lastNameLabel',
            lastNamePlaceholder: 'lastNamePlaceholder',
            lastNameRequired: 'lastNameRequired',
            namePattern: 'namePattern',
            emailLabel: 'emailLabel',
            emailPlaceholder: 'emailPlaceholder',
            emailRequired: 'emailRequired',
            validEmailRequired: 'validEmailRequired',
            accountRoleLabel: 'accountRoleLabel',
            accountRolePlaceholder: 'accountRolePlaceholder',
            accountRoleRequired: 'accountRoleRequired',
            validAccountRoleRequired: 'validAccountRoleRequired',
            institutionLabel: 'institutionLabel',
            institutionPlaceholder: 'institutionPlaceholder',
            institutionRequired: 'institutionRequired',
            validInstitutionRequired: 'validInstitutionRequired',
          },
          toast: {
            successfulFormSubmissionBody: 'successfulFormSubmissionBody',
          },
        },
        passwordReset: {
          form: {
            header: 'header',
            emailLabel: 'emailLabel',
            emailPlaceholder: 'emailPlaceholder',
            emailRequired: 'emailRequired',
            validEmailRequired: 'validEmailRequired',
            submitButton: 'submitButton',
            loadingText: 'loadingText',
          },
          toast: {
            successfulFormSubmissionBody: 'successfulFormSubmissionBody',
          },
        },
      },
      dashboard: {
        todo: {
          instructions: 'instructions',
          currentItems: 'currentItems',
          noApplicationsTodo: 'noApplicationsTodo',
          noSubmittedApplicationsTodo: 'noSubmittedApplicationsTodo',
          noInterviewSetTodo: 'noInterviewSetTodo',
          noFirmChoiceSetTodo: 'noFirmChoiceSetTodo',
          noOfferSetTodo: 'noOfferSetTodo',
          noFinalDestinationSetTodo: 'noFinalDestinationSetTodo',
          emptyTodoList: 'emptyTodoList',
        },
        statistics: {
          applications: 'applications',
          plannedApplications: 'plannedApplications',
          submittedApplications: 'submittedApplications',
          withdrawnApplications: 'withdrawnApplications',
          distinctCountries: 'distinctCountries',
          distinctUniversities: 'distinctUniversities',
          offers: 'offers',
          firmChoice: 'firmChoice',
          finalDestination: 'finalDestination',
          notYetSelected: 'notYetSelected',
        },
      },
      applications: {
        buttons: {
          edit: 'edit',
          view: 'view',
          refresh: 'refresh',
          display: 'display',
          download: 'download',
        },
        toast: {
          downloadRequestSuccessDescription: 'downloadRequestSuccessDescription',
          downloadRequestErrorTitle: 'downloadRequestErrorTitle',
          downloadRequestErrorDescription: 'downloadRequestErrorDescription',
        },
      },
      applicationCreate: {
        description: {
          formTitle: 'formTitle',
          formInformation: 'formInformation',
          country: 'country',
          university: 'university',
          courseName: 'courseName',
          minorSubject: 'minorSubject',
          programmeLength: 'programmeLength',
        },
        form: {
          loadingText: 'loadingText',
          submitButton: 'submitButton',
          universityDataFetching: 'universityDataFetching',
          countryLabel: 'countryLabel',
          countryPlaceholder: 'countryPlaceholder',
          universityLabel: 'universityLabel',
          universityPlaceholder: 'universityPlaceholder',
          courseNameLabel: 'courseNameLabel',
          courseNamePlaceholder: 'courseNamePlaceholder',
          minorSubjectLabel: 'minorSubjectLabel',
          minorSubjectPlaceholder: 'minorSubjectPlaceholder',
          programmeLengthLabel: 'programmeLengthLabel',
          countryRequired: 'countryRequired',
          validCountryRequired: 'validCountryRequired',
          universityRequired: 'universityRequired',
          validUniversityRequired: 'validUniversityRequired',
          courseNameRequired: 'courseNameRequired',
          courseNamePattern: 'courseNamePattern',
          minorSubjectPattern: 'minorSubjectPattern',
          programmeLengthRequired: 'programmeLengthRequired',
          programmeLengthPattern: 'programmeLengthPattern',
        },
        toast: {
          successfulFormSubmissionBody: 'successfulFormSubmissionBody',
        },
      },
      applicationEdit: {
        description: {
          formTitle: 'formormTitle',
          formInformation: 'formormInformation',
          country: 'country',
          university: 'university',
          courseName: 'courseName',
          minorSubject: 'minorSubject',
          programmeLength: 'programmeLength',
          applicationStatus: 'applicationStatus',
          interviewStatus: 'interviewStatus',
          offerStatus: 'offerStatus',
          responseStatus: 'responseStatus',
          finalDestinationStatus: 'finalDestinationStatus',
        },
        form: {
          submitButton: 'submitButton',
          countryLabel: 'countryLabel',
          universityLabel: 'universityLabel',
          courseNameLabel: 'courseNameLabel',
          minorSubjectLabel: 'minorSubjectLabel',
          programmeLengthLabel: 'programmeLengthLabel',
          applicationStatusLabel: 'applicationStatusLabel',
          applicationStatusPlaceholder: 'applicationStatusPlaceholder',
          interviewStatusLabel: 'interviewStatusLabel',
          interviewStatusPlaceholder: 'interviewStatusPlaceholder',
          offerStatusLabel: 'offerStatusLabel',
          offerStatusPlaceholder: 'offerStatusPlaceholder',
          responseStatusLabel: 'responseStatusLabel',
          responseStatusPlaceholder: 'responseStatusPlaceholder',
          finalDestinationStatusLabel: 'finalDestinationStatusLabel',
          finalDestinationStatusPlaceholder: 'finalDestinationStatusPlaceholder',
          missingApplicationStatus: 'missingApplicationStatus',
          validApplicationStatusRequired: 'validApplicationStatusRequired',
          validInterviewStatusRequired: 'validInterviewStatusRequired',
          validOfferStatusRequired: 'validOfferStatusRequired',
          validResponseStatusRequired: 'validResponseStatusRequired',
          oneFirmChoiceApplicationOnly: 'oneFirmChoiceApplicationOnly',
          validFinalDestinationStatusRequired: 'validFinalDestinationStatusRequired',
          oneFinalDestinationApplicationOnly: 'oneFinalDestinationApplicationOnly',
        },
        toast: {
          successfulFormSubmissionBody: 'successfulFormSubmissionBody',
        },
        removeRequest: {
          requestDeletion: 'requestDeletion',
          requestReversion: 'requestReversion',
        },
      },
      applicationView: {
        application: {
          edit: 'edit',
          countryLabel: 'countryLabel',
          universityLabel: 'universityLabel',
          courseNameLabel: 'courseNameLabel',
          minorSubjectLabel: 'minorSubjectLabel',
          programmeLengthLabel: 'programmeLengthLabel',
          applicationStatusLabel: 'applicationStatusLabel',
          interviewStatusLabel: 'interviewStatusLabel',
          offerStatusLabel: 'offerStatusLabel',
          responseStatusLabel: 'responseStatusLabel',
          finalDestinationStatusLabel: 'finalDestinationStatusLabel',
        },
        comment: {
          previousPage: 'previousPage',
          nextPage: 'nextPage',
          page: 'page',
          form: {
            submitButton: 'submitButton',
            commentLabel: 'commentLabel',
            commentPlaceholder: 'commentPlaceholder',
            commentRequired: 'commentRequired',
            commentPattern: 'commentPattern',
          },
          toast: {
            successfulFormSubmissionBody: 'successfulFormSubmissionBody',
          },
        },
      },
    },
    domain: {
      application: {
        submittedBy: 'submittedBy',
        submittedAt: 'submittedAt',
        lastModifiedBy: 'lastModifiedBy',
        lastUpdatedAt: 'lastUpdatedAt',
        applicationStatusPlanned: 'applicationStatusPlanned',
        applicationStatusSubmitted: 'applicationStatusSubmitted',
        applicationStatusWithdrawn: 'applicationStatusWithdrawn',
        interviewStatusInvited: 'interviewStatusInvited',
        interviewStatusNoInterview: 'interviewStatusNoInterview',
        interviewStatusNotInvited: 'interviewStatusNotInvited',
        offerStatusConditional: 'offerStatusConditional',
        offerStatusDeferred: 'offerStatusDeferred',
        offerStatusRejected: 'offerStatusRejected',
        offerStatusUnconditional: 'offerStatusUnconditional',
        responseStatusFirmChoice: 'responseStatusFirmChoice',
        responseStatusInsuranceChoice: 'responseStatusInsuranceChoice',
        offerStatusOfferDeclined: 'offerStatusOfferDeclined',
        finalDestinationStatusFinalDestination: 'finalDestinationStatusFinalDestination',
        finalDestinationStatusDeferredEntry: 'finalDestinationStatusDeferredEntry',
        finalDestinationStatusNotFinalDestination: 'finalDestinationStatusNotFinalDestination',
      },
    },
  },
} as const;

type TranslationKeyType = typeof TranslationKey;
type DotPrefix<T extends string, U extends string> = `${T}.${U}`;
type DotNotatedTranslationKey<T> = T extends string
  ? ''
  : {
      [K in keyof T & string]: T[K] extends string ? K : DotPrefix<K, DotNotatedTranslationKey<T[K]>>;
    }[keyof T & string];
type TranslationValueInner<T> = {
  [K in keyof T]: T[K] extends string ? string : TranslationValueInner<T[K]>;
};
export type DotTranslationKey = DotNotatedTranslationKey<TranslationKeyType>;
export type TranslationValue = {
  [K in keyof TranslationKeyType]: TranslationValueInner<TranslationKeyType[K]>;
};

type TranslationLocale = 'en';

export const translations: { name: string; code: TranslationLocale; value: TranslationValue }[] = [
  {
    name: 'English',
    code: 'en',
    value: {
      app: {
        layout: {
          navigation: {
            shared: {
              contactUs: 'Contact Us',
              dashboard: 'Dashboard',
              logOut: 'Log Out',
              myAccount: 'My Account',
              messages: 'Messages',
              feedback: 'Feedback',
            },
            student: {
              newApplication: 'New Application',
              myApplications: 'My Applications',
            },
            mentor: {
              myStudents: 'My Students',
              myStudentsApplications: "My Students' Applications",
            },
          },
          footer: {
            initYear: '2024',
            content: '© built with vite/tanstack react typescript, spring boot, rabbitmq, redis, psql and ❤️',
          },
        },
        generic: {
          loading: {
            dataCompilation: 'The application is loading...',
            formSubmission: 'Your data is being submitted.',
            handlingRequest: 'Handling your request...',
          },
          toast: {
            successToastTitle: 'Success',
            serverErrorToastTitle: 'Server Error',
            serverErrorToastDescription:
              "The application's server is currently not available. Come back and try again at a later time.",
            unexpectedErrorToastTitle: 'Unexpected error',
            unexpectedErrorToastDescription:
              'The application has encountered an unexpected error. Refresh your browser and try again.',
          },
          error: {
            tryAgain: 'Try Again',
            queryFetchError:
              'Fetching the necessary data was unsuccessful. Click on the  button to try again or come back later.',
            unexpectedError: 'The application has encountered an unexpected error. Refresh your browser and try again.',
          },
        },
        component: {
          form: {
            countryLabel: 'Country',
            countryPlaceholder: 'Select the country of your choice.',
            universityLabel: 'University',
            universityPlaceholder: 'Select the university of your choice.',
            courseNameLabel: 'Course Name',
            courseNamePlaceholder: 'Provide the course of your choice.',
            minorSubjectLabel: 'Minor Subject',
            minorSubjectPlaceholder: 'Provide your minor course.',
            programmeLengthLabel: 'Programme Length',
            applicationStatusLabel: 'Application Status',
            applicationStatusPlaceholder: "Update the application's current status.",
            interviewStatusLabel: 'Interview Status',
            interviewStatusPlaceholder: "Update the application's interview status.",
            offerStatusLabel: 'Offer Status',
            offerStatusPlaceholder: "Update the university's decision.",
            responseStatusLabel: 'Response Status',
            responseStatusPlaceholder: 'Update your response status.',
            finalDestinationStatusLabel: 'Final Destination Status',
            finalDestinationStatusPlaceholder: 'Update your final decision regarding this application.',
          },
        },
        page: {
          root: {
            selectorButtons: {
              logIn: 'Log in',
              registerPendingAccount: 'Create account',
              resetPassword: 'Forgotten password?',
            },
            login: {
              form: {
                header: 'Log in if you already have an admin-approved account, otherwise, apply for one first.',
                emailLabel: 'Email',
                emailPlaceholder: 'Enter your email address',
                emailRequired: 'Provide your email address.',
                validEmailRequired: 'Provide a valid email address.',
                passwordLabel: 'Password',
                passwordPlaceholder: 'Enter your password',
                passwordRequired: 'Provide your password.',
                submitButton: 'Log in',
                loadingText: 'You are being logged in.',
              },
            },
            pendingAccountRegistration: {
              form: {
                header: 'Register an account if you are not in our system yet.',
                submitButton: 'Register',
                loadingText: 'Your registration is being submitted.',
                firstNameLabel: 'First Name',
                firstNamePlaceholder: 'Enter your first name(s)',
                firstNameRequired: 'Provide your first name(s).',
                lastNameLabel: 'Last Name',
                lastNamePlaceholder: 'Enter your last name(s)',
                lastNameRequired: 'Provide your last name(s).',
                namePattern:
                  'Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 255 characters.',
                emailLabel: 'Email',
                emailPlaceholder: 'Enter your email address',
                emailRequired: 'Provide your email address.',
                validEmailRequired: 'Provide a valid email address.',
                institutionLabel: 'Institution',
                institutionPlaceholder: 'Select the institution you currently attend.',
                institutionRequired: 'Select an institution.',
                validInstitutionRequired: 'Select a valid institution.',
                accountRoleLabel: 'Account Type',
                accountRolePlaceholder: 'Select your account type.',
                accountRoleRequired: 'Select an account type.',
                validAccountRoleRequired: 'Select a valid account type.',
              },
              toast: {
                successfulFormSubmissionBody:
                  'Thank you for registering your account. You will soon receive an email with further details.',
              },
            },
            passwordReset: {
              form: {
                header:
                  'Request a password reset if you have forgotten your password. Do not request a reset if your account is not yet activated.',
                submitButton: 'Reset',
                loadingText: 'Your reset request is being handled.',
                emailLabel: 'Email',
                emailPlaceholder: 'Enter your email address',
                emailRequired: 'Provide your email address.',
                validEmailRequired: 'Provide a valid email address.',
              },
              toast: {
                successfulFormSubmissionBody:
                  'Your password has been successfully reset. You will soon receive an email with further instructions.',
              },
            },
          },
          dashboard: {
            todo: {
              instructions:
                'Review your to-do list below. Keep in mind that nothing is urgent on this list! Certain items might only be fulfilled towards the end of your application period or school year. What is important is that you update your applications when you made any progress. You are the one responsible for minding your deadlines. Let your mentor know if you have any blocking issues, concerns or questions!',
              currentItems: 'Your current to-do items:',
              noApplicationsTodo:
                'You have not yet submitted any applications. If you have any blocking issues, get in touch with your mentor or school administrator.',
              noSubmittedApplicationsTodo:
                "You currently have only 'Planned' applications. Make sure to submit your applications once your deadlines are closing in.",
              noInterviewSetTodo: 'You have not yet updated the interview status of any of your applications.',
              noFirmChoiceSetTodo: 'You have not yet indicated your firm choice.',
              noOfferSetTodo: 'You have not yet indicated whether you have received any offers.',
              noFinalDestinationSetTodo: 'You have not yet indicated your final destination.',
              emptyTodoList: 'You have no items on your to-do list.',
            },
            statistics: {
              applications: 'Applications',
              plannedApplications: 'Planned Applications',
              submittedApplications: 'Submitted Applications',
              withdrawnApplications: 'Withdrawn Applications',
              distinctCountries: 'Distinct Countries',
              distinctUniversities: 'Distinct Universities',
              offers: 'Offers',
              firmChoice: 'Firm Choice',
              finalDestination: 'Final Destination',
              notYetSelected: 'Not yet selected',
            },
          },
          applications: {
            buttons: {
              edit: 'Edit',
              view: 'View',
              refresh: 'Refresh',
              display: 'Display',
              download: 'Download',
            },
            toast: {
              downloadRequestSuccessDescription:
                'Your request has been received. You will receive an email soon with the details.',
              downloadRequestErrorTitle: 'Request not received',
              downloadRequestErrorDescription:
                'Your download request was unsuccessful. Refresh your browser or try again at a later time.',
            },
          },
          applicationCreate: {
            description: {
              formTitle: 'Submit New Application',
              formInformation:
                "Fill in all mandatory fields before submitting the application. Upon visiting the Applications page, you will find more fields to fill in for each of your submitted applications. Make sure to come back in the following months and properly update their statuses. Once you have submitted an application, you will not be able to change the country, university and course fields. Submit an application only if you are committed to it. If you do not find your selected country or university in the dropdown lists, reach out to an admin via the 'Feedback' form.",
              country:
                'The first step of your application process is selecting the country of your choice. You are not able to select your chosen university until you have selected its home country. If you do not see the country of your choice amongst the options, reach out to our admin team using the form under the Contact Us page.',
              university:
                'Once you have selected a country, you will be able to pick any universities of that country from the dropdown options. If you do not see the university of your choice amongst the options, reach out to our admin team using the form under the Contact Us page.',
              courseName: 'Enter the full name of the course you plan to apply to.',
              minorSubject:
                'Enter the full name of the minor course that accompanies your major course. Leave the input box empty if you have no minor course.',
              programmeLength:
                'Enter the length of your selected course (years). By default, the value is set to 3 years, update it only if it is different for your selected course.',
            },
            form: {
              loadingText: 'Your application is being submitted.',
              universityDataFetching: 'Fetching university list...',
              submitButton: 'Submit application',
              countryRequired: 'Select a country',
              validCountryRequired: 'Select a valid country.',
              universityRequired: 'Select a university',
              validUniversityRequired: 'Select a valid university.',
              courseNameRequired: 'Provide the name of your selected course.',
              courseNamePattern:
                'Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 255 characters.',
              minorSubjectPattern:
                'Provide a minor subject only if you it is relevant, using only letters, spaces or hyphens, with a minimum of 1 and a maximum of 255 characters.',
              programmeLengthRequired: 'Provide the length (year) of your selected course.',
              programmeLengthPattern: 'You may enter numeric values only between 1 and 5.',
              countryLabel: 'Country',
              countryPlaceholder: 'Select the country of your choice.',
              universityLabel: 'University',
              universityPlaceholder: 'Select the university of your choice.',
              courseNameLabel: 'Course Name',
              courseNamePlaceholder: 'Provide the course of your choice.',
              minorSubjectLabel: 'Minor Subject',
              minorSubjectPlaceholder: 'Provide your minor course.',
              programmeLengthLabel: 'Programme Length',
            },
            toast: {
              successfulFormSubmissionBody:
                'Your submission was successful. Wishing you the best of luck with your application!',
            },
          },
          applicationEdit: {
            description: {
              formTitle: 'Update Application',
              formInformation:
                "Review your application and update its fields once you have received decisions from the university. You are not able to edit the course name, university and country fields as your application is considered final. If you have submitted this application by mistake with incorrect data, mark it for deletion and your mentor will review it. If you have changed your mind about the application, set its Application Status to 'Withdrawn'. Let your mentor know if you have any questions with the application. If you have any issues with the site or form, reach out to our team using the 'Feedback' form.",
              country: 'The country of your choice.',
              university: 'The university of your choice.',
              courseName: 'The course of your choice.',
              minorSubject: 'The minor subject of your choice (if any).',
              programmeLength: 'The length (years) of your chosen course.',
              applicationStatus:
                "Update the application status to either: (1) 'Submitted' once you have submitted it via the university's submission portal; (2) 'Withdrawn' if you have decided not to move forward with the application.",
              interviewStatus: 'Update the status to reflect the current standing in the interview process.',
              offerStatus: "Update the university's response once you have received the final decision.",
              responseStatus:
                'Update the field according to your preferred ranking. You may only have one Firm Choice as your number one target.',
              finalDestinationStatus:
                "Update this final status once you have all the necessary information. There can only be one Final Destination, which is when you accept the university's offer. All other applications should be marked as 'Not Final Destination'.",
            },
            form: {
              submitButton: 'Update application',
              countryLabel: 'Country',
              universityLabel: 'University',
              courseNameLabel: 'Course Name',
              minorSubjectLabel: 'Minor Subject',
              programmeLengthLabel: 'Programme Length',
              applicationStatusLabel: 'Application Status',
              applicationStatusPlaceholder: "Update the application's current status.",
              interviewStatusLabel: 'Interview Status',
              interviewStatusPlaceholder: "Update the application's interview status.",
              offerStatusLabel: 'Offer Status',
              offerStatusPlaceholder: "Update the university's decision.",
              responseStatusLabel: 'Response Status',
              responseStatusPlaceholder: 'Update your response status.',
              finalDestinationStatusLabel: 'Final Destination Status',
              finalDestinationStatusPlaceholder: 'Update your final decision regarding this application.',
              missingApplicationStatus: "The form submission should include an 'Application Status'.",
              validApplicationStatusRequired: 'Provide a valid Application status.',
              validInterviewStatusRequired: 'Provide a valid Interview status.',
              validOfferStatusRequired: 'Provide a valid Offer status.',
              validResponseStatusRequired: 'Provide a valid Response status.',
              oneFirmChoiceApplicationOnly:
                "The application was not updated as you may only have one Response set to 'Firm Choice'.",
              validFinalDestinationStatusRequired: 'Provide a valid Final Destination status.',
              oneFinalDestinationApplicationOnly:
                "The application was not updated as you may only have one Application set to 'Final Destination'.",
            },
            toast: {
              successfulFormSubmissionBody: 'Your application was successfully updated.',
            },
            removeRequest: {
              requestDeletion: 'Request deletion',
              requestReversion: 'Revert deletion request',
            },
          },
          applicationView: {
            application: {
              edit: 'Edit',
              countryLabel: 'Country',
              universityLabel: 'University',
              courseNameLabel: 'Course Name',
              minorSubjectLabel: 'Minor Subject',
              programmeLengthLabel: 'Programme Length',
              applicationStatusLabel: 'Application Status',
              interviewStatusLabel: 'Interview Status',
              offerStatusLabel: 'Offer Status',
              responseStatusLabel: 'Response Status',
              finalDestinationStatusLabel: 'Final Destination Status',
            },
            comment: {
              previousPage: 'Previous',
              nextPage: 'Next',
              page: 'Page',
              form: {
                submitButton: 'Add comment',
                commentLabel: 'Comment',
                commentPlaceholder: 'Write your comment here...',
                commentRequired: 'Add your comment.',
                commentPattern: 'Provide a minimum of 15 and a maximum of 1000 characters.',
              },
              toast: {
                successfulFormSubmissionBody: 'Your comment was successfully submitted!',
              },
            },
          },
        },

        domain: {
          application: {
            submittedBy: 'Submitted by:',
            submittedAt: 'Submitted at:',
            lastModifiedBy: 'Last modified by:',
            lastUpdatedAt: 'Last updated at:',
            applicationStatusPlanned: 'Planned',
            applicationStatusSubmitted: 'Submitted',
            applicationStatusWithdrawn: 'Withdrawn',
            interviewStatusInvited: 'Invited',
            interviewStatusNoInterview: 'No Interview',
            interviewStatusNotInvited: 'Not Invited',
            offerStatusConditional: 'Conditional',
            offerStatusDeferred: 'Deferred',
            offerStatusRejected: 'Rejected',
            offerStatusUnconditional: 'Unconditional',
            responseStatusFirmChoice: 'Firm Choice',
            responseStatusInsuranceChoice: 'Insurance Choice',
            offerStatusOfferDeclined: 'Offer Declined',
            finalDestinationStatusFinalDestination: 'Final Destination',
            finalDestinationStatusDeferredEntry: 'Final Destination (Deferred Entry)',
            finalDestinationStatusNotFinalDestination: 'Not Final Destination',
          },
        },
      },
    },
  },
];
