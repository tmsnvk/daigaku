/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const mutationKeys = {
  account: {
    POST_ACCOUNT_LOGIN_FORM: 'post-account-login-form',
    POST_REGISTER: 'post-pending-account-registration-form',
    POST_RESET_FORM: 'post-account-reset-form',
  },
  application: {
    POST_BY_STUDENT: 'post-application-by-student',
    PATCH_BY_UUID: 'patch-application-by-uuid',
    IS_REMOVABLE: 'patch-application-by-uuid-for-is-removable',
    POST_REQUEST_PDF_DOWNLOAD: 'post-request-pdf-download',
  },
  comment: {
    POST_BY_APPLICATION_UUID: 'post-by-application-uuid',
  },
};

export const queryKeys = {
  ACCOUNT: {
    GET_ME: 'get-me',
  },
  ACCOUNT_ROLE: {
    GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS: 'get-student-and-mentor-role-select-options',
  },
  application: {
    GET_ALL_BY_ROLE: 'get-applications-by-role',
    GET_BY_UUID: 'get-application-by-uuid',
  },
  INSTITUTIONS: {
    GET_AS_SELECT_OPTIONS: 'get-all-institution-select-options',
  },
  COUNTRY: {
    GET_AS_SELECT_OPTIONS: 'get-all-country-select-options',
  },
  UNIVERSITY: {
    GET_AS_SELECT_OPTIONS: 'get-all-university-select-options',
  },
  APPLICATION_STATUS: {
    GET_AS_SELECT_OPTIONS: 'get-all-application-status-select-options',
  },
  INTERVIEW_STATUS: {
    GET_AS_SELECT_OPTIONS: 'get-all-interview-status-select-options',
  },
  OFFER_STATUS: {
    GET_AS_SELECT_OPTIONS: 'get-all-offer-status-select-options',
  },
  RESPONSE_STATUS: {
    GET_AS_SELECT_OPTIONS: 'get-all-response-status-select-options',
  },
  FINAL_DESTINATION: {
    GET_AS_SELECT_OPTIONS: 'get-all-final-destination-status-select-options',
  },
  aggregate: {
    GET_DASHBOARD_STATISTICS: 'get-dashboard-statistics',
  },
  comments: {
    GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION: 'get-all-by-application-uuid-and-pagination',
  },
};
