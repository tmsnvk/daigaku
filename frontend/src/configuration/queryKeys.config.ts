const MUTATION_KEYS = {
  ACCOUNT: {
    POST_LOGIN_FORM: 'postAccountLoginForm',
    POST_REGISTER_FORM: 'postAccountRegisterForm',
    POST_FORGOTTEN_PASSWORD_FORM: 'postAccountForgottenPasswordForm',
  },
  APPLICATION: {
    POST_APPLICATION_BY_STUDENT: 'postApplicationByStudent',
    PUT_APPLICATION: 'putApplication',
  },
};

const QUERY_KEYS = {
  APPLICATION: {
    GET_APPLICATIONS: 'getApplications',
    GET_APPLICATION_BY_ID: 'getApplicationById',
  },
  COUNTRY: {
    GET_COUNTRY_SELECT_OPTIONS: 'getCountryOptions',
  },
  UNIVERSITY: {
    GET_UNIVERSITY_SELECT_OPTIONS: 'getUniversityOptions',
  },
  AGGREGATE: {
    GET_DASHBOARD_DATA: 'getDashboardData',
  },
};

export {
  MUTATION_KEYS,
  QUERY_KEYS,
};
