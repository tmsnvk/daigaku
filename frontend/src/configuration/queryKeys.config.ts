const mutationKeys = {
  ACCOUNT: {
    POST_LOGIN_FORM: 'postAccountLoginForm',
    POST_REGISTER_FORM: 'postPendingAccountRegisterForm',
    POST_FORGOTTEN_PASSWORD_FORM: 'postAccountForgottenPasswordForm',
  },
  APPLICATION: {
    POST_BY_STUDENT: 'postApplicationByStudent',
    PATCH_BY_UUID: 'patchApplicationByUuid',
    MARK_FOR_DELETION: 'patchApplicationByUuidForMarkDeletion',
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
    GET_STUDENT_AND_MENTOR_ROLES_AS_OPTIONS: 'getStudentAndMentorRoleSelectOptions',
  },
  INSTITUTIONS: {
    GET_AS_SELECT_OPTIONS: 'getAllInstitutionSelectOptions',
  },
  APPLICATION: {
    GET_ALL_BY_ROLE: 'getApplicationsByRole',
    GET_BY_UUID: 'getApplicationByUuid',
    POST_DOWNLOAD_REQUEST: 'postDownloadRequest',
  },
  APPLICATION_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllApplicationStatus',
  },
  INTERVIEW_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllInterviewStatus',
  },
  OFFER_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllOfferStatus',
  },
  RESPONSE_STATUS: {
    GET_AS_SELECT_OPTIONS: 'getAllResponseStatus',
  },
  FINAL_DESTINATION: {
    GET_AS_SELECT_OPTIONS: 'getAllFinalDestinationStatus',
  },
  COUNTRY: {
    GET_AS_SELECT_OPTIONS: 'getAllCountrySelectOptions',
  },
  UNIVERSITY: {
    GET_AS_SELECT_OPTIONS: 'getAllUniversitySelectOptions',
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
