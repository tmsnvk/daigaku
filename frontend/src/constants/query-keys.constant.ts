/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const mutationKeys = {
  account: {
    POST_LOGIN_FORM: 'post-account-login-form',
    POST_REGISTER_FORM: 'post-pending-account-registration-form',
    POST_RESET_PASSWORD_FORM: 'post-account-reset-form',
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
  account: {
    GET_ME: 'get-me',
  },
  accountRole: {
    GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS: 'get-student-and-mentor-role-select-options',
  },
  application: {
    GET_ALL_BY_ROLE: 'get-applications-by-role',
    GET_BY_UUID: 'get-application-by-uuid',
  },
  institutions: {
    GET_AS_SELECT_OPTIONS: 'get-all-institution-select-options',
  },
  country: {
    GET_AS_SELECT_OPTIONS: 'get-all-country-select-options',
  },
  university: {
    GET_AS_SELECT_OPTIONS: 'get-all-university-select-options',
  },
  aggregate: {
    GET_DASHBOARD_STATISTICS: 'get-dashboard-statistics',
  },
  comments: {
    GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION: 'get-all-by-application-uuid-and-pagination',
  },
};
