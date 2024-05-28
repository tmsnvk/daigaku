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
};

const queryKeys = {
  ACCOUNT: {
    GET_ME: 'getMe',
  },
  INSTITUTIONS: {
    GET_AS_SELECT_OPTIONS: 'getAllInstitutionSelectOptions',
  },
  APPLICATION: {
    GET_ALL_BY_ROLE: 'getApplicationsByRole',
    GET_BY_ID: 'getApplicationById',
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
    GET_ALL: 'getAllFinalDestinationStatus',
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
};

export {
  mutationKeys,
  queryKeys,
};
