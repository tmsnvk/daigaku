/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const TranslationKey = {
  // layout - shared
  CONTACT_US: 'contactUs',
  DASHBOARD: 'dashboard',
  LOG_OUT: 'logOut',
  MY_ACCOUNT: 'myAccount',
  MESSAGES: 'messages',
  FEEDBACK: 'feedback',

  // layout - student
  NEW_APPLICATION: 'newApplication',
  MY_APPLICATION: 'myApplications',

  // layout - mentor
  MY_STUDENTS: 'myStudents',
  MY_STUDENT_APPLICATIONS: 'myStudentsApplications',

  // layout - institution admin

  // layout - system admin
  ALL_STUDENTS: 'allStudents',
  ALL_MENTORS: 'allMentors',
  ALL_APPLICATIONS: 'allApplications',
  SYSTEM: 'system',

  // layout - footer
  INIT_YEAR: 'initYear',
  FOOTER_CONTENT: 'footerContent',

  // loading texts
  DATA_COMPILATION: 'dataCompilation',
  DATA_FETCHING: 'dataFetching',
  UNIVERSITY_DATA_FETCHING: 'universityDataFetching',
  APPLICATION_UPDATED: 'applicationUpdated',
  GENERIC_FORM_SUBMISSION: 'genericFormSubmission',
  LOGIN_FORM_SUBMISSION: 'loginFormSubmission',
  PENDING_ACCOUNT_REGISTRATION_FORM_SUBMISSION: 'pendingAccountRegistrationFormSubmission',
  RESET_PASSWORD_FORM_SUBMISSION: 'resetPasswordFormSubmission',
  CREATE_APPLICATION_RECORD_FORM_SUBMISSION: 'createApplicationRecordFormSubmission',
  HANDLING_REQUEST: 'handlingRequest',

  // notifications
  GENERIC_SUCCESS_TOAST_TITLE: 'genericSuccessToastTitle',
  PENDING_ACCOUNT_REGISTRATION_FORM_SUBMISSION_TOAST_DESCRIPTION: 'pendingAccountRegistrationFormSubmissionToastDescription',
  RESET_PASSWORD_FORM_SUBMISSION_TOAST_DESCRIPTION: 'resetPasswordRegistrationFormSubmissionToastDescription',
  APPLICATIONS_PDF_DOWNLOAD_TOAST: 'applicationPdfDownloadToast',
  CREATE_APPLICATION_RECORD_FORM_SUBMISSION_TOAST_DESCRIPTION: 'createApplicationRecordFormSubmissionToastDescription',

  // acceptance
  ACCEPTANCE_OK: 'acceptanceOk',

  // errors
  TRY_AGAIN: 'tryAgain',
  QUERY_FETCH_ERROR: 'queryFetchError',
  UNEXPECTED_ERROR: 'unexpectedError',
  UNEXPECTED_SERVER_ERROR: 'unexpectedServerError',
  UNEXPECTED_GLOBAL_ERROR: 'unexpectedGlobalError',

  // application records
  SUBMITTED_BY: 'submittedBy',
  SUBMITTED_AT: 'submittedAt',
  LAST_MODIFIED_BY: 'lastModifiedBy',
  LAST_UPDATED_AT: 'lastUpdatedAt',

  // components - buttons
  REQUEST_DELETION: 'requestDeletion',
  REQUEST_REVERSION: 'requestReversion',
  VIEW: 'view',
  EDIT: 'edit',
  PAGINATION_PREVIOUS: 'previousPage',
  PAGINATION_NEXT: 'nextPage',
  PAGE: 'page',
  REFRESH: 'refresh',
  DISPLAY: 'display',
  DOWNLOAD: 'download',
  LOGIN: 'login',
  PENDING_ACCOUNT_REGISTRATION: 'pendingAccountRegistration',
  RESET_PASSWORD: 'resetPassword',
  LOGIN_FORM_FORM_SUBMIT: 'loginFormSubmit',
  PENDING_ACCOUNT_REGISTRATION_FORM_SUBMIT: 'pendingAccountRegistrationFormSubmit',
  RESET_PASSWORD_FORM_SUBMIT: 'resetPasswordFormSubmit',
  CREATE_COMMENT_FORM_SUBMIT: 'createCommentFormSubmit',
  CREATE_APPLICATION_RECORD_FORM_SUBMIT: 'createApplicationRecordFormSubmit',
  UPDATE_APPLICATION_RECORD_FORM_SUBMIT: 'updateApplicationRecordFormSubmit',

  // components - forms
  EMAIL_LABEL: 'emailLabel',
  EMAIL_PLACEHOLDER: 'emailPlaceholder',
  PASSWORD_LABEL: 'passwordLabel',
  PASSWORD_PLACEHOLDER: 'passwordPlaceholder',
  FIRST_NAME_LABEL: 'firstNameLabel',
  FIRST_NAME_PLACEHOLDER: 'firstNamePlaceholder',
  LAST_NAME_LABEL: 'lastNameLabel',
  LAST_NAME_PLACEHOLDER: 'lastNamePlaceholder',
  ACCOUNT_ROLE_LABEL: 'accountRoleLabel',
  ACCOUNT_ROLE_PLACEHOLDER: 'accountRolePlaceholder',
  INSTITUTION_LABEL: 'institutionLabel',
  INSTITUTION_PLACEHOLDER: 'institutionPlaceholder',
  COUNTRY_LABEL: 'countryLabel',
  COUNTRY_LABEL_PLACEHOLDER: 'countryPlaceholder',
  UNIVERSITY_LABEL: 'universityLabel',
  UNIVERSITY_PLACEHOLDER: 'universityPlaceholder',
  COURSE_NAME_LABEL: 'courseNameLabel',
  COURSE_NAME_PLACEHOLDER: 'courseNamePlaceholder',
  MINOR_SUBJECT_LABEL: 'minorSubjectLabel',
  MINOR_SUBJECT_PLACEHOLDER: 'minorSubjectPlaceholder',
  PROGRAMME_LENGTH_LABEL: 'programmeLengthLabel',
  APPLICATION_STATUS_LABEL: 'applicationStatusLabel',
  APPLICATION_STATUS_PLACEHOLDER: 'applicationStatusPlaceholder',
  INTERVIEW_STATUS_LABEL: 'interviewStatusLabel',
  INTERVIEW_STATUS_PLACEHOLDER: 'interviewStatusPlaceholder',
  OFFER_STATUS_LABEL: 'offerStatusLabel',
  OFFER_STATUS_PLACEHOLDER: 'offerStatusPlaceholder',
  RESPONSE_STATUS_LABEL: 'responseStatusLabel',
  RESPONSE_STATUS_PLACEHOLDER: 'responseStatusPlaceholder',
  FINAL_DESTINATION_STATUS_LABEL: 'finalDestinationStatusLabel',
  FINAL_DESTINATION_STATUS_PLACEHOLDER: 'finalDestinationStatusPlaceholder',
  COMMENT_LABEL: 'commentLabel',
  COMMENT_PLACEHOLDER: 'commentPlaceholder',

  // components - form validation
  FIRST_NAME_REQUIRED: 'firstNameRequired',
  LAST_NAME_REQUIRED: 'lastNameRequired',
  NAME_PATTERN: 'namePattern',
  EMAIL_REQUIRED: 'emailRequired',
  PASSWORD_REQUIRED: 'passwordRequired',
  ACCOUNT_ROLE_REQUIRED: 'accountRoleRequired',
  INSTITUTION_REQUIRED: 'institutionRequired',
  COUNTRY_REQUIRED: 'countryRequired',
  UNIVERSITY_REQUIRED: 'universityRequired',
  COURSE_NAME_REQUIRED: 'courseNameRequired',
  COURSE_NAME_PATTERN: 'courseNamePattern',
  MINOR_SUBJECT_PATTERN: 'minorSubjectPattern',
  PROGRAMME_LENGTH_REQUIRED: 'programmeLengthRequired',
  PROGRAMME_LENGTH_PATTERN: 'programmeLengthPattern',
  COMMENT_REQUIRED: 'commentRequired',
  COMMENT_PATTERN: 'commentPattern',

  // pages - unauthorized root
  LOGIN_FORM_HEADER: 'loginFormHeader',
  PENDING_ACCOUNT_REGISTER_FORM_HEADER: 'pendingAccountRegisterFormHeader',
  RESET_PASSWORD_FORM_HEADER: 'resetPasswordFormHeader',

  // pages - dashboard
  TODO_LIST_INSTRUCTIONS: 'todoListInstructions',
  CURRENT_TODO_ITEMS: 'currentTodoItems',
  NO_APPLICATION_RECORDS_TODO: 'noApplicationRecordsTodo',
  NO_SUBMITTED_APPLICATION_RECORDS_TODO: 'noSubmittedApplicationRecordsTodo',
  NO_INTERVIEW_SET_TODO: 'noInterviewSetTodo',
  NO_FIRM_CHOICE_SET_TODO: 'noFirmChoiceSetTodo',
  NO_OFFER_SET_TODO: 'noOfferSetTodo',
  NO_FINAL_DESTINATION_SET_TODO: 'noFinalDestinationSetTodo',
  EMPTY_TODO_LIST: 'emptyTodoList',
  APPLICATION_RECORDS_TILE: 'applicationRecordsTile',
  PLANNED_APPLICATION_RECORDS_TILE: 'plannedApplicationRecordsTile',
  SUBMITTED_APPLICATION_RECORDS_TILE: 'submittedApplicationRecordsTile',
  WITHDRAWN_APPLICATIONS_RECORDS_TILE: 'withdrawnApplicationRecordsTile',
  DISTINCT_COUNTRIES_TILE: 'distinctCountriesTile',
  DISTINCT_UNIVERSITIES_TILE: 'distinctUniversitiesTile',
  OFFERS_TILE: 'offersTile',
  FIRM_CHOICE_TILE: 'firmChoiceTile',
  FINAL_DESTINATION_TILE: 'finalDestinationTile',
  NOT_YET_SELECTED_TILE: 'notYetSelectedTile',

  // pages - create application record
  NEW_APPLICATION_RECORD_FORM_TITLE: 'newApplicationRecordFormTitle',
  NEW_APPLICATION_RECORD_FORM_INFORMATION: 'newApplicationRecordFormInformation',
  COUNTRY_NEW_FIELD_INFORMATION: 'countryNewFieldInformation',
  UNIVERSITY_NEW_FIELD_INFORMATION: 'universityNewFieldInformation',
  COURSE_NAME_NEW_FIELD_INFORMATION: 'courseNameNewFieldInformation',
  MINOR_SUBJECT_NEW_FIELD_INFORMATION: 'minorSubjectNewFieldInformation',
  PROGRAMME_LENGTH_NEW_FIELD_INFORMATION: 'programmeLengthNewFieldInformation',

  // pages - update application record
  UPDATE_APPLICATION_RECORD_FORM_TITLE: 'updateApplicationRecordFormTitle',
  UPDATE_APPLICATION_RECORD_FORM_INFORMATION: 'updateApplicationRecordFormInformation',
  COUNTRY_UPDATE_FIELD_INFORMATION: 'countryUpdateFieldInformation',
  UNIVERSITY_UPDATE_FIELD_INFORMATION: 'universityUpdateFieldInformation',
  COURSE_NAME_UPDATE_FIELD_INFORMATION: 'courseNameUpdateFieldInformation',
  MINOR_SUBJECT_UPDATE_FIELD_INFORMATION: 'minorSubjectUpdateFieldInformation',
  PROGRAMME_LENGTH_UPDATE_FIELD_INFORMATION: 'programmeLengthUpdateFieldInformation',
  APPLICATION_STATUS_UPDATE_FIELD_INFORMATION: 'applicationStatusUpdateFieldInformation',
  INTERVIEW_STATUS_UPDATE_FIELD_INFORMATION: 'interviewStatusUpdateFieldInformation',
  OFFER_STATUS_UPDATE_FIELD_INFORMATION: 'offerStatusUpdateFieldInformation',
  RESPONSE_STATUS_UPDATE_FIELD_INFORMATION: 'responseStatusUpdateFieldInformation',
  FINAL_DESTINATION_STATUS_UPDATE_FIELD_INFORMATION: 'finalDestinationStatusUpdateFieldInformation',

} as const;

type TranslationKey = (typeof TranslationKey)[keyof typeof TranslationKey];
type TranslationValue = { [key in TranslationKey]: string };
type TranslationLocale = 'en';

export const translations: { name: string; code: TranslationLocale; value: TranslationValue }[] = [
  {
    name: 'English',
    code: 'en',
    value: {
      // layout - shared
      contactUs: 'Contact Us',
      dashboard: 'Dashboard',
      logOut: 'Log Out',
      myAccount: 'My Account',
      messages: 'Messages',
      feedback: 'Feedback',

      // layout - student
      newApplication: 'New Application',
      myApplications: 'My Applications',

      // layout - mentor
      myStudents: 'My Students',
      myStudentsApplications: 'My Students\' Applications',

      // layout - institution admin

      // layout - system admin
      allStudents: 'All Students',
      allMentors: 'All Mentors',
      allApplications: 'All Applications',
      system: 'System',

      // layout - footer
      initYear: '2024',
      footerContent: '© built with vite/tanstack react typescript, spring boot, rabbitmq, redis, psql and ❤️',

      // loading texts
      dataCompilation: 'The application is compiling your data...',
      dataFetching: 'The required data is being fetched...',
      universityDataFetching: 'Fetching university list...',
      applicationUpdated: 'Your application was successfully updated.',
      genericFormSubmission: 'Your data is being submitted.',
      loginFormSubmission: 'You are being logged in.',
      pendingAccountRegistrationFormSubmission: 'Your registration is being submitted.',
      resetPasswordFormSubmission: 'Your reset request is being handled.',
      createApplicationRecordFormSubmission: 'Your application is being submitted.',
      handlingRequest: 'Handling your request...',

      // notifications
      genericSuccessToastTitle: 'Success',
      pendingAccountRegistrationFormSubmissionToastDescription: 'Thank you for registering your account. You will soon receive an email with further details.',
      resetPasswordRegistrationFormSubmissionToastDescription: 'Your password has been reset. You will soon receive an email with further instructions.',
      applicationPdfDownloadToast: 'Your request has been received. You will receive an email soon with the details.',
      createApplicationRecordFormSubmissionToastDescription: 'Your submission was successful. Wishing you the best of luck with your application!',

      // acceptance
      acceptanceOk: 'Ok',

      // errors
      tryAgain: 'Try Again',
      queryFetchError:
        'Fetching the necessary data was unsuccessful. Click on the  button to try again or come back later.',
      unexpectedError: 'The application has encountered an unexpected error. Refresh your browser and try again.',
      unexpectedServerError: 'An unexpected server error happened.',
      unexpectedGlobalError: 'An unexpected error happened.',

      // application records
      submittedBy: 'Submitted by:',
      submittedAt: 'Submitted at:',
      lastModifiedBy: 'Last modified by:',
      lastUpdatedAt: 'Last updated at:',

      // components - buttons
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
      login: 'Log in',
      pendingAccountRegistration: 'Create account',
      resetPassword: 'Forgotten password?',
      loginFormSubmit: 'Sign in',
      pendingAccountRegistrationFormSubmit: 'Register',
      resetPasswordFormSubmit: 'Reset',
      createCommentFormSubmit: 'Add comment',
      createApplicationRecordFormSubmit: 'Submit application',
      updateApplicationRecordFormSubmit: 'Update application',

      // components - forms
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email address',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      firstNameLabel: 'First Name',
      firstNamePlaceholder: 'Enter your first name(s)',
      lastNameLabel: 'Last Name',
      lastNamePlaceholder: 'Enter your last name(s)',
      accountRoleLabel: 'Account Type',
      accountRolePlaceholder: 'Select your account type.',
      institutionLabel: 'Institution',
      institutionPlaceholder: 'Select the institution you currently attend.',
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
      applicationStatusPlaceholder: 'Update the application\'s current status.',
      interviewStatusLabel: 'Interview Status',
      interviewStatusPlaceholder: 'Update the application\'s interview status.',
      offerStatusLabel: 'Offer Status',
      offerStatusPlaceholder: 'Update the university\'s decision.',
      responseStatusLabel: 'Response Status',
      responseStatusPlaceholder: 'Update your response status.',
      finalDestinationStatusLabel: 'Final Destination Status',
      finalDestinationStatusPlaceholder: 'Update your final decision regarding this application.',
      commentLabel: 'Comment',
      commentPlaceholder: 'Write your comment here...',

      // components - form validation
      firstNameRequired: 'Providing your first name is required.',
      lastNameRequired: 'Providing your last name is required.',
      namePattern: 'Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 100 characters.',
      emailRequired: 'Providing your email address is required.',
      passwordRequired: 'Providing your password is required.',
      accountRoleRequired: 'Selecting an account role is required.',
      institutionRequired: 'Selecting an institution is required.',
      countryRequired: 'Selecting a country is required.',
      universityRequired: 'Selecting a university is required.',
      courseNameRequired: 'Providing the name of your selected course is required.',
      courseNamePattern: 'Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.',
      minorSubjectPattern: 'Providing a minor subject is optional but use only letters, spaces and a minimum of 5 and a maximum of 255 characters if you do so.',
      programmeLengthRequired: 'Providing the length of your selected course is required.',
      programmeLengthPattern: 'You may enter numeric values only between 2 and 5.',
      commentRequired: 'Add your comment.',
      commentPattern: 'Provide a minimum of 15 and a maximum of 1000 characters.',

      // pages - unauthorized root
      loginFormHeader: 'Sign in if you already have an admin-approved account, otherwise, apply for one first.',
      pendingAccountRegisterFormHeader: 'Register an account if you are not in our system yet.',
      resetPasswordFormHeader:
        'Request a password reset if you have forgotten your password. Do not request a reset if your account is not yet activated.',

      // pages - dashboard
      todoListInstructions:
        'Review your to-do list below. Keep in mind that nothing is urgent on this list! Certain items might only be fulfilled towards the end of your application period or school year. What is important is that you update your applications when you made any progress. You are the one responsible for minding your deadlines. Let your mentor know if you have any blocking issues, concerns or questions!',
      currentTodoItems: 'Your current to-do items:',
      noApplicationRecordsTodo:
        'You have not yet submitted any applications. If you have any blocking issues, get in touch with your mentor or school administrator.',
      noSubmittedApplicationRecordsTodo:
        'You currently have only \'Planned\' applications. Make sure to submit your applications once your deadlines are closing in.',
      noInterviewSetTodo: 'You have not yet updated the interview status of any of your applications.',
      noFirmChoiceSetTodo: 'You have not yet indicated your firm choice.',
      noOfferSetTodo: 'You have not yet indicated whether you have received any offers.',
      noFinalDestinationSetTodo: 'You have not yet indicated your final destination.',
      emptyTodoList: 'You have no items on your to-do list.',
      applicationRecordsTile: 'Applications',
      plannedApplicationRecordsTile: 'Planned Applications',
      submittedApplicationRecordsTile: 'Submitted Applications',
      withdrawnApplicationRecordsTile: 'Withdrawn Applications',
      distinctCountriesTile: 'Distinct Countries',
      distinctUniversitiesTile: 'Distinct Universities',
      offersTile: 'Offers',
      firmChoiceTile: 'Firm Choice',
      finalDestinationTile: 'Final Destination',
      notYetSelectedTile: 'Not yet selected',

      // pages - create application record
      newApplicationRecordFormTitle: 'Submit New Application',
      newApplicationRecordFormInformation: 'Fill in all mandatory fields before submitting the application. Upon visiting the Applications page, you will find more fields to fill in for each of your submitted applications. Make sure to come back in the following months and properly update their statuses. Once you have submitted an application, you will not be able to change the country, university and course fields. Submit an application only if you are committed to it. If you do not find your selected country or university in the dropdown lists, reach out to an admin via the \'Feedback\' form.',
      countryNewFieldInformation: 'The first step of your application process is selecting the country of your choice. You are not able to select your chosen university until you have selected its home country. If you do not see the country of your choice amongst the options, reach out to our admin team using the form under the Contact Us page.',
      universityNewFieldInformation: 'Once you have selected a country, you will be able to pick any universities of that country from the dropdown options. If you do not see the university of your choice amongst the options, reach out to our admin team using the form under the Contact Us page.',
      courseNameNewFieldInformation: 'Enter the full name of the course you plan to apply to.',
      minorSubjectNewFieldInformation: 'Enter the full name of the minor course that accompanies your major course. Leave the input box empty if you have no minor course.',
      programmeLengthNewFieldInformation: 'Enter the length of your selected course (years). By default, the value is set to 3 years, update it only if it is different for your selected course.',

      // pages - update application record
      updateApplicationRecordFormTitle: 'Update Application',
      updateApplicationRecordFormInformation: 'Review your application and update its fields once you have received decisions from the university. You are not able to edit the course name, university and country fields as your application is considered final. If you have submitted this application by mistake with incorrect data, mark it for deletion and your mentor will review it. If you have changed your mind about the application, set its Application Status to \'Withdrawn\'. Let your mentor know if you have any questions with the application. If you have any issues with the site or form, reach out to our team using the \'Feedback\' form.',
      countryUpdateFieldInformation: 'The country of your choice.',
      universityUpdateFieldInformation: 'The university of your choice.',
      courseNameUpdateFieldInformation: 'The course of your choice.',
      minorSubjectUpdateFieldInformation: 'The minor subject of your choice (if any).',
      programmeLengthUpdateFieldInformation: 'The length (years) of your chosen course.',
      applicationStatusUpdateFieldInformation: 'Update the application status to either: (1) \'Submitted\' once you have submitted it via the university\'s submission portal; (2) \'Withdrawn\' if you have decided not to move forward with the application.',
      interviewStatusUpdateFieldInformation: 'Update the status to reflect the current standing in the interview process.',
      offerStatusUpdateFieldInformation: 'Update the university\'s response once you have received the final decision.',
      responseStatusUpdateFieldInformation: 'Update the field according to your preferred ranking. You may only have one Firm Choice as your number one target.',
      finalDestinationStatusUpdateFieldInformation: 'Update this final status once you have all the necessary information. There can only be one Final Destination, which is when you accept the university\'s offer. All other applications should be marked as \'Not Final Destination\'.',
    },
  },
];

// export const localization = {
//   PAGES: {
//     COMMON: {
//       APPLICATION_EDIT: {
//         NOTIFICATIONS: {
//           PAGE_LOADING: 'The application is compiling your data...',
//           APPLICATION_LOADING: 'Your application is being updated.',
//           APPLICATION_SUBMIT: 'update application',
//
//         },
//       },
//       STUDENT: {
//         NEW_APPLICATION: {
//           MESSAGES: {
//             PAGE_LOADING: 'The application is fetching the necessary data for the form submission...',
//             UNIVERSITY_LOADING: ,
//           },
//
//     },
//   },
// };
