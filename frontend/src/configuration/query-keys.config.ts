const mutationKeys = {
  ACCOUNT: {
    POST_LOGIN: 'postAccountLoginForm',
    POST_REGISTER: 'postPendingAccountRegisterForm',
    POST_FORGOTTEN_PASSWORD: 'postAccountForgottenPasswordForm',
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

const queryKeys = {
  ACCOUNT: {
    GET_ME: 'getMe',
  },
  ACCOUNT_ROLE: {
    GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS: 'getStudentAndMentorRoleSelectOptions',
  },
  APPLICATION: {
    GET_ALL_BY_ROLE: 'getApplicationsByRole',
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
  AGGREGATE: {
    GET_DASHBOARD_DATA: 'getDashboardData',
  },
  COMMENTS: {
    GET_ALL_BY_APPLICATION_UUID: 'getAllByApplicationUuid',
  },
};

export {
  mutationKeys,
  queryKeys,
};
