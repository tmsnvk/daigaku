/**
 * @prettier
 */

export const mutationKeys = {
  account: {
    POST_LOGIN_FORM: 'post-account-login-form',
    POST_REGISTER: 'post-pending-account-registration-form',
    POST_RESET_FORM: 'post-account-reset-form',
  },
  application: {
    POST_BY_STUDENT: 'postApplicationByStudent',
    PATCH_BY_UUID: 'patch-application-by-uuid',
    IS_REMOVABLE: 'patch-application-by-uuid-for-is-removable',
    POST_REQUEST_PDF_DOWNLOAD: 'post-request-pdf-download',
  },
  COMMENTS: {
    POST_COMMENT_BY_APPLICATION: 'postCommentByApplicationUuid',
  },
};

export const queryKeys = {
  ACCOUNT: {
    GET_ME: 'getMe',
  },
  ACCOUNT_ROLE: {
    GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS: 'getStudentAndMentorRoleSelectOptions',
  },
  application: {
    GET_ALL_BY_ROLE: 'get-applications-by-role',
    GET_BY_UUID: 'get-application-by-uuid',
  },
  INSTITUTIONS: {
    GET_AS_SELECT_OPTIONS: 'getAllInstitutionSelectOptions',
  },
  COUNTRY: {
    GET_AS_SELECT_OPTIONS: 'getAllCountrySelectOptions',
  },
  UNIVERSITY: {
    GET_AS_SELECT_OPTIONS: 'getAllUniversitySelectOptions',
  },
  APPLICATION_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllApplicationStatusSelectOptions',
  },
  INTERVIEW_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllInterviewStatusSelectOptions',
  },
  OFFER_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllOfferStatusSelectOptions',
  },
  RESPONSE_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllResponseStatusSelectOptions',
  },
  FINAL_DESTINATION: {
    GET_AS_SELECT_OPTIONS: 'getAllFinalDestinationStatusSelectOptions',
  },
  aggregate: {
    GET_DASHBOARD_STATISTICS: 'get-dashboard-statistics',
  },
  comments: {
    GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION: 'get-all-by-application-uuid-and-pagination',
  },
};
