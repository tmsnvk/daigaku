/**
 * @prettier
 */

export const mutationKeys = {
  account: {
    POST_LOGIN_FORM: 'post-account-login-form',
    POST_REGISTER: 'post-pending-account-registration-form',
    POST_RESET_FORM: 'post-account-reset-form',
  },
  APPLICATION: {
    POST_BY_STUDENT: 'postApplicationByStudent',
    PATCH_BY_UUID: 'patchApplicationByUuid',
    IS_REMOVABLE: 'patchApplicationByUuidForIsRemovable',
    POST_PDF_REQUEST: 'postDownloadRequest',
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
    GET_BY_UUID: 'getApplicationByUuid',
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
  COMMENTS: {
    GET_ALL_BY_APPLICATION_UUID: 'getAllByApplicationUuid',
  },
};
