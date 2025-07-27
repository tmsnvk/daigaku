/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const TranslationKey = {
  application: {
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
      validation: {
        countryRequired: 'countryRequired',
        validCountryRequired: 'validCountryRequired',
        universityRequired: 'universityRequired',
        validUniversityRequired: 'validUniversityRequired',
        courseNameRequired: 'courseNameRequired',
        courseNamePattern: 'courseNamePattern',
        minorSubjectPattern: 'minorSubjectPattern',
        programmeLengthRequired: 'programmeLengthRequired',
        programmeLengthPattern: 'programmeLengthPattern',
        commentRequired: 'commentRequired',
        commentPattern: 'commentPattern',
        validApplicationStatusRequired: 'validApplicationStatusRequired',
        validInterviewStatusRequired: 'validInterviewStatusRequired',
        validOfferStatusRequired: 'validOfferStatusRequired',
        validResponseStatusRequired: 'validResponseStatusRequired',
        validFinalDestinationStatusRequired: 'validFinalDestinationStatusRequired',
      },
      loading: {
        dataCompilation: 'dataCompilation',
        dataFetching: 'dataFetching',
        universityDataFetching: 'universityDataFetching',
        applicationUpdated: 'applicationUpdated',
        genericFormSubmission: 'genericFormSubmission',

        createApplicationFormSubmission: 'createApplicationFormSubmission',
        handlingRequest: 'handlingRequest',
      },
      toast: {
        successToastTitle: 'successToastTitle',

        applicationPdfDownloadToast: 'applicationPdfDownloadToast',
        createApplicationFormSubmissionToastDescription: 'createApplicationFormSubmissionToastDescription',
        createCommentFormSubmissionToastDescription: 'createCommentFormSubmissionToastDescription',
        serverErrorToastTitle: 'serverErrorToastTitle',
        serverErrorToastDescription: 'serverErrorToastDescription',
        unexpectedErrorToastTitle: 'unexpectedErrorToastTitle',
        unexpectedErrorToastDescription: 'unexpectedErrorToastDescription',
        pdfRequestErrorTitle: 'pdfRequestErrorTitle',
        pdfRequestErrorDescription: 'pdfRequestErrorDescription',
      },
      error: {
        tryAgain: 'tryAgain',
        queryFetchError: 'queryFetchError',
        unexpectedError: 'unexpectedError',
        serverError: 'serverError',
      },
    },
    component: {
      button: {
        requestDeletion: 'requestDeletion',
        requestReversion: 'requestReversion',
        view: 'view',
        edit: 'edit',
        previousPage: 'previousPage',
        nextPage: 'nextPage',
        page: 'page',
        refresh: 'refresh',
        display: 'display',
        download: 'download',

        createCommentFormSubmit: 'createCommentFormSubmit',
        createApplicationFormSubmit: 'createApplicationFormSubmit',
        updateApplicationFormSubmit: 'updateApplicationFormSubmit',
      },
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
        commentLabel: 'commentLabel',
        commentPlaceholder: 'commentPlaceholder',
      },
    },
    page: {
      root: {
        loginForm: {
          header: 'header',
          logIn: 'logIn',
          emailLabel: 'emailLabel',
          emailPlaceholder: 'emailPlaceholder',
          emailRequired: 'emailRequired',
          validEmailRequired: 'validEmailRequired',
          passwordLabel: 'passwordLabel',
          passwordPlaceholder: 'passwordPlaceholder',
          passwordRequired: 'passwordRequired',
          submit: 'submit',
          formLoading: 'formLoading',
        },
        pendingAccountRegistrationForm: {
          header: 'header',
          registerPendingAccount: 'registerPendingAccount',
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
          submit: 'submit',
          formLoading: 'formLoading',
          successfulSubmissionToastDescription: 'successfulSubmissionToastDescription',
        },
        passwordResetForm: {
          header: 'header',
          resetPassword: 'resetPassword',
          emailLabel: 'emailLabel',
          emailPlaceholder: 'emailPlaceholder',
          emailRequired: 'emailRequired',
          validEmailRequired: 'validEmailRequired',
          submit: 'submit',
          formLoading: 'formLoading',
          successfulSubmissionToastDescription: 'successfulSubmissionToastDescription',
        },
      },
      dashboard: {
        todoListInstructions: 'todoListInstructions',
        currentTodoItems: 'currentTodoItems',
        noApplicationsTodo: 'noApplicationsTodo',
        noSubmittedApplicationsTodo: 'noSubmittedApplicationsTodo',
        noInterviewSetTodo: 'noInterviewSetTodo',
        noFirmChoiceSetTodo: 'noFirmChoiceSetTodo',
        noOfferSetTodo: 'noOfferSetTodo',
        noFinalDestinationSetTodo: 'noFinalDestinationSetTodo',
        emptyTodoList: 'emptyTodoList',
        applicationsTile: 'applicationsTile',
        plannedApplicationsTile: 'plannedApplicationsTile',
        submittedApplicationsTile: 'submittedApplicationsTile',
        withdrawnApplicationsTile: 'withdrawnApplicationsTile',
        distinctCountriesTile: 'distinctCountriesTile',
        distinctUniversitiesTile: 'distinctUniversitiesTile',
        offersTile: 'offersTile',
        firmChoiceTile: 'firmChoiceTile',
        finalDestinationTile: 'finalDestinationTile',
        notYetSelectedTile: 'notYetSelectedTile',
      },
      applicationsCreate: {
        newApplicationFormTitle: 'newApplicationFormTitle',
        newApplicationFormInformation: 'newApplicationFormInformation',
        countryNewFieldInformation: 'countryNewFieldInformation',
        universityNewFieldInformation: 'universityNewFieldInformation',
        courseNameNewFieldInformation: 'courseNameNewFieldInformation',
        minorSubjectNewFieldInformation: 'minorSubjectNewFieldInformation',
        programmeLengthNewFieldInformation: 'programmeLengthNewFieldInformation',
      },
      applicationsUpdate: {
        updateApplicationFormTitle: 'updateApplicationFormTitle',
        updateApplicationFormInformation: 'updateApplicationFormInformation',
        countryUpdateFieldInformation: 'countryUpdateFieldInformation',
        universityUpdateFieldInformation: 'universityUpdateFieldInformation',
        courseNameUpdateFieldInformation: 'courseNameUpdateFieldInformation',
        minorSubjectUpdateFieldInformation: 'minorSubjectUpdateFieldInformation',
        programmeLengthUpdateFieldInformation: 'programmeLengthUpdateFieldInformation',
        applicationStatusUpdateFieldInformation: 'applicationStatusUpdateFieldInformation',
        interviewStatusUpdateFieldInformation: 'interviewStatusUpdateFieldInformation',
        offerStatusUpdateFieldInformation: 'offerStatusUpdateFieldInformation',
        responseStatusUpdateFieldInformation: 'responseStatusUpdateFieldInformation',
        finalDestinationStatusUpdateFieldInformation: 'finalDestinationStatusUpdateFieldInformation',
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
      application: {
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
          validation: {
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
            commentRequired: 'Add your comment.',
            commentPattern: 'Provide a minimum of 15 and a maximum of 1000 characters.',
            validApplicationStatusRequired: 'Provide a valid Application status.',
            validInterviewStatusRequired: 'Provide a valid Interview status.',
            validOfferStatusRequired: 'Provide a valid Offer status.',
            validResponseStatusRequired: 'Provide a valid Response status.',
            validFinalDestinationStatusRequired: 'Provide a valid Final Destination status.',
          },
          loading: {
            dataCompilation: 'The application is loading...',
            dataFetching: 'The required data is being fetched...',
            universityDataFetching: 'Fetching university list...',
            applicationUpdated: 'Your application was successfully updated.',
            genericFormSubmission: 'Your data is being submitted.',

            createApplicationFormSubmission: 'Your application is being submitted.',
            handlingRequest: 'Handling your request...',
          },
          toast: {
            successToastTitle: 'Success',

            applicationPdfDownloadToast:
              'Your request has been received. You will receive an email soon with the details.',
            createApplicationFormSubmissionToastDescription:
              'Your submission was successful. Wishing you the best of luck with your application!',
            createCommentFormSubmissionToastDescription: 'Your comment was successfully submitted!',
            serverErrorToastTitle: 'Server Error',
            serverErrorToastDescription:
              "The application's server is currently not available. Come back and try again at a later time.",
            unexpectedErrorToastTitle: 'Unexpected error',
            unexpectedErrorToastDescription:
              'The application has encountered an unexpected error. Refresh your browser and try again.',
            pdfRequestErrorTitle: 'Request not received',
            pdfRequestErrorDescription:
              'Your download request was unsuccessful. Refresh your browser or try again at a later time.',
          },
          error: {
            tryAgain: 'Try Again',
            queryFetchError:
              'Fetching the necessary data was unsuccessful. Click on the  button to try again or come back later.',
            unexpectedError: 'The application has encountered an unexpected error. Refresh your browser and try again.',
            serverError: 'An unexpected server error happened.',
          },
        },
        component: {
          button: {
            requestDeletion: 'Request deletion',
            requestReversion: 'Revert request',
            view: 'View',
            edit: 'Edit',
            previousPage: 'Previous',
            nextPage: 'Next',
            page: 'Page',
            refresh: 'Refresh',
            display: 'Display',
            download: 'Download',
            createCommentFormSubmit: 'Add comment',
            createApplicationFormSubmit: 'Submit application',
            updateApplicationFormSubmit: 'Update application',
          },
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
            commentLabel: 'Comment',
            commentPlaceholder: 'Write your comment here...',
          },
        },
        page: {
          root: {
            loginForm: {
              header: 'Log in if you already have an admin-approved account, otherwise, apply for one first.',
              submit: 'Log in',
              logIn: 'Log in',
              emailLabel: 'Email',
              emailPlaceholder: 'Enter your email address',
              emailRequired: 'Provide your email address.',
              validEmailRequired: 'Provide a valid email address.',
              passwordLabel: 'Password',
              passwordPlaceholder: 'Enter your password',
              passwordRequired: 'Provide your password.',
              formLoading: 'You are being logged in.',
            },
            pendingAccountRegistrationForm: {
              header: 'Register an account if you are not in our system yet.',
              submit: 'Register',
              registerPendingAccount: 'Create account',
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
              formLoading: 'Your registration is being submitted.',
              successfulSubmissionToastDescription:
                'Thank you for registering your account. You will soon receive an email with further details.',
            },
            passwordResetForm: {
              header:
                'Request a password reset if you have forgotten your password. Do not request a reset if your account is not yet activated.',
              resetPassword: 'Forgotten password?',
              emailLabel: 'Email',
              emailPlaceholder: 'Enter your email address',
              emailRequired: 'Provide your email address.',
              validEmailRequired: 'Provide a valid email address.',
              submit: 'Reset',
              formLoading: 'Your reset request is being handled.',
              successfulSubmissionToastDescription:
                'Your password has been successfully reset. You will soon receive an email with further instructions.',
            },
          },
          dashboard: {
            todoListInstructions:
              'Review your to-do list below. Keep in mind that nothing is urgent on this list! Certain items might only be fulfilled towards the end of your application period or school year. What is important is that you update your applications when you made any progress. You are the one responsible for minding your deadlines. Let your mentor know if you have any blocking issues, concerns or questions!',
            currentTodoItems: 'Your current to-do items:',
            noApplicationsTodo:
              'You have not yet submitted any applications. If you have any blocking issues, get in touch with your mentor or school administrator.',
            noSubmittedApplicationsTodo:
              "You currently have only 'Planned' applications. Make sure to submit your applications once your deadlines are closing in.",
            noInterviewSetTodo: 'You have not yet updated the interview status of any of your applications.',
            noFirmChoiceSetTodo: 'You have not yet indicated your firm choice.',
            noOfferSetTodo: 'You have not yet indicated whether you have received any offers.',
            noFinalDestinationSetTodo: 'You have not yet indicated your final destination.',
            emptyTodoList: 'You have no items on your to-do list.',
            applicationsTile: 'Applications',
            plannedApplicationsTile: 'Planned Applications',
            submittedApplicationsTile: 'Submitted Applications',
            withdrawnApplicationsTile: 'Withdrawn Applications',
            distinctCountriesTile: 'Distinct Countries',
            distinctUniversitiesTile: 'Distinct Universities',
            offersTile: 'Offers',
            firmChoiceTile: 'Firm Choice',
            finalDestinationTile: 'Final Destination',
            notYetSelectedTile: 'Not yet selected',
          },
          applicationsCreate: {
            newApplicationFormTitle: 'Submit New Application',
            newApplicationFormInformation:
              "Fill in all mandatory fields before submitting the application. Upon visiting the Applications page, you will find more fields to fill in for each of your submitted applications. Make sure to come back in the following months and properly update their statuses. Once you have submitted an application, you will not be able to change the country, university and course fields. Submit an application only if you are committed to it. If you do not find your selected country or university in the dropdown lists, reach out to an admin via the 'Feedback' form.",
            countryNewFieldInformation:
              'The first step of your application process is selecting the country of your choice. You are not able to select your chosen university until you have selected its home country. If you do not see the country of your choice amongst the options, reach out to our admin team using the form under the Contact Us page.',
            universityNewFieldInformation:
              'Once you have selected a country, you will be able to pick any universities of that country from the dropdown options. If you do not see the university of your choice amongst the options, reach out to our admin team using the form under the Contact Us page.',
            courseNameNewFieldInformation: 'Enter the full name of the course you plan to apply to.',
            minorSubjectNewFieldInformation:
              'Enter the full name of the minor course that accompanies your major course. Leave the input box empty if you have no minor course.',
            programmeLengthNewFieldInformation:
              'Enter the length of your selected course (years). By default, the value is set to 3 years, update it only if it is different for your selected course.',
          },
          applicationsUpdate: {
            updateApplicationFormTitle: 'Update Application',
            updateApplicationFormInformation:
              "Review your application and update its fields once you have received decisions from the university. You are not able to edit the course name, university and country fields as your application is considered final. If you have submitted this application by mistake with incorrect data, mark it for deletion and your mentor will review it. If you have changed your mind about the application, set its Application Status to 'Withdrawn'. Let your mentor know if you have any questions with the application. If you have any issues with the site or form, reach out to our team using the 'Feedback' form.",
            countryUpdateFieldInformation: 'The country of your choice.',
            universityUpdateFieldInformation: 'The university of your choice.',
            courseNameUpdateFieldInformation: 'The course of your choice.',
            minorSubjectUpdateFieldInformation: 'The minor subject of your choice (if any).',
            programmeLengthUpdateFieldInformation: 'The length (years) of your chosen course.',
            applicationStatusUpdateFieldInformation:
              "Update the application status to either: (1) 'Submitted' once you have submitted it via the university's submission portal; (2) 'Withdrawn' if you have decided not to move forward with the application.",
            interviewStatusUpdateFieldInformation:
              'Update the status to reflect the current standing in the interview process.',
            offerStatusUpdateFieldInformation:
              "Update the university's response once you have received the final decision.",
            responseStatusUpdateFieldInformation:
              'Update the field according to your preferred ranking. You may only have one Firm Choice as your number one target.',
            finalDestinationStatusUpdateFieldInformation:
              "Update this final status once you have all the necessary information. There can only be one Final Destination, which is when you accept the university's offer. All other applications should be marked as 'Not Final Destination'.",
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
