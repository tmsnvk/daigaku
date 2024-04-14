const mutationKeys = {
  ACCOUNT: {
    POST_LOGIN_FORM: 'postAccountLoginForm',
    POST_REGISTER_FORM: 'postAccountRegisterForm',
    POST_FORGOTTEN_PASSWORD_FORM: 'postAccountForgottenPasswordForm',
  },
  APPLICATION: {
    POST_BY_STUDENT: 'postApplicationByStudent',
    PATCH_BY_UUID: 'patchApplicationByUuid',
  },
};

const queryKeys = {
  ACCOUNT: {
    GET_ME: 'getMe',
  },
  APPLICATION: {
    GET_ALL_BY_ROLE: 'getApplicationsByRole',
    GET_BY_ID: 'getApplicationById',
  },
  APPLICATION_STATUS: {
    GET_ALL: 'getApplicationStatuses',
  },
  INTERVIEW_STATUS: {
    GET_ALL: 'getInterviewStatuses',
  },
  OFFER_STATUS: {
    GET_ALL: 'getOfferStatuses',
  },
  RESPONSE_STATUS: {
    GET_ALL: 'getResponseStatuses',
  },
  FINAL_DESTINATION: {
    GET_ALL: 'getFinalDestinationStatuses',
  },
  COUNTRY: {
    GET_AS_SELECT_OPTIONS: 'getCountryOptions',
  },
  UNIVERSITY: {
    GET_AS_SELECT_OPTIONS: 'getUniversityOptions',
  },
  AGGREGATE: {
    GET_DASHBOARD_DATA: 'getDashboardData',
  },
};

export {
  mutationKeys,
  queryKeys,
};
