const MUTATION_KEYS = {
  ACCOUNT: {
    POST_LOGIN_FORM: 'postAccountLoginForm',
    POST_REGISTER_FORM: 'postAccountRegisterForm',
    POST_FORGOTTEN_PASSWORD_FORM: 'postAccountForgottenPasswordForm',
  },
  APPLICATION: {
    POST_BY_STUDENT: 'postApplicationByStudent',
    PUT_BY_ID: 'putApplicationById',
  },
};

const QUERY_KEYS = {
  APPLICATION: {
    GET_ALL: 'getApplications',
    GET_BY_ID: 'getApplicationById',
  },
  APPLICATION_STATUS: {
    GET_ALL: 'getApplicationStatuses',
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
  MUTATION_KEYS,
  QUERY_KEYS,
};
