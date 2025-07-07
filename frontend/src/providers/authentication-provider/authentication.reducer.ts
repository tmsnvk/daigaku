/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { match } from 'ts-pattern';

/* interface, type imports */
import { LoginResponse, UserLoginStates } from '@daigaku/common-types';
import { AuthenticationState } from './authentication.types';

/**
 * The authentication action type enum values.
 */
export const AuthenticationActionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
  TOKEN_VALIDATION_SUCCESS: 'TOKEN_VALIDATION_SUCCESS',
  TOKEN_VALIDATION_FAILURE: 'TOKEN_VALIDATION_FAILURE',
} as const;

/**
 * Defines the LOG_IN action type.
 */
interface LogInAction {
  /**
   * The action type.
   */
  type: typeof AuthenticationActionTypes.LOG_IN;

  /**
   * The login payload.
   */
  payload: {
    response: LoginResponse;
  };
}

/**
 * Defines the LOG_OUT action type.
 */
interface LogOutAction {
  /**
   * The action type.
   */
  type: typeof AuthenticationActionTypes.LOG_OUT;
}

/**
 * Defines the TOKEN_VALIDATION_SUCCESS action type.
 */
interface TokenValidationSuccessAction {
  /**
   * The action type.
   */
  type: typeof AuthenticationActionTypes.TOKEN_VALIDATION_SUCCESS;

  /**
   * The validation state payload.
   */
  payload: {
    response: LoginResponse;
  };
}

/**
 * Defines the TOKEN_VALIDATION_FAILURE action type.
 */
interface TokenValidationFailureAction {
  /**
   * The action type.
   */
  type: typeof AuthenticationActionTypes.TOKEN_VALIDATION_FAILURE;
}

/**
 * The authentication actions' union type.
 */
type AuthenticationAction = LogInAction | LogOutAction | TokenValidationSuccessAction | TokenValidationFailureAction;

export const initialReducerState: AuthenticationState = {
  account: {
    email: '',
    firstName: '',
    role: null,
  },
  authenticationStatus: UserLoginStates.LOGGED_OUT,
};

/**
 *
 * @param _state
 * @param action
 * @returns
 */
export const authenticationReducer = (
  state: AuthenticationState,
  action: AuthenticationAction,
): AuthenticationState => {
  return match<AuthenticationAction, AuthenticationState>(action)
    .with({ type: AuthenticationActionTypes.LOG_IN }, ({ payload }) => {
      return {
        account: {
          email: payload.response.email,
          firstName: payload.response.firstName,
          role: payload.response.role,
        },
        authenticationStatus: UserLoginStates.LOGGED_IN,
      };
    })
    .with({ type: AuthenticationActionTypes.LOG_OUT }, () => {
      return {
        account: initialReducerState.account,
        authenticationStatus: UserLoginStates.LOGGED_OUT,
      };
    })
    .with({ type: AuthenticationActionTypes.TOKEN_VALIDATION_SUCCESS }, ({ payload }) => {
      return {
        account: {
          email: payload.response.email,
          firstName: payload.response.firstName,
          role: payload.response.role,
        },
        authenticationStatus: UserLoginStates.LOGGED_IN,
      };
    })
    .with({ type: AuthenticationActionTypes.TOKEN_VALIDATION_FAILURE }, () => {
      return {
        account: initialReducerState.account,
        authenticationStatus: UserLoginStates.LOGGED_OUT,
      };
    })
    .exhaustive();
};
