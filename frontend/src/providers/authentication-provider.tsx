/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Context, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { localStorageKeys, queryKeys } from '@daigaku/constants';
import {
  getLocalStorageObjectById,
  isAuthTokenExpired,
  removeLocalStorageObjectById,
  setLocalStorageObjectById,
} from '@daigaku/utilities';

/* interface, type imports */
import { LoginResponse, UserLoginState, UserLoginStates, UserRole } from '@daigaku/common-types';

/**
 * The authentication action type enum values.
 */
const AuthenticationActionTypes = {
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

/**
 * Defines the properties of the data associated with the logged-in user.
 */
interface Account {
  email: string;
  firstName: string;
  role: UserRole | null;
}

/**
 *
 */
type AuthenticationState = {
  account: Account;
  authenticationStatus: UserLoginState;
};

/**
 * Defines the properties of the AuthenticationContext context object.
 */
interface AuthenticationContextValue {
  state: AuthenticationState;
  logIn: (response: LoginResponse) => void;
  logOut: () => void;
}

/**
 * Defines the AuthenticationProvider context provider.
 */
interface AuthenticationProviderProps {
  /**
   * Children elements to render within the provider.
   */
  children: ReactNode;
}

const initialReducerState: AuthenticationState = {
  account: {
    email: '',
    firstName: '',
    role: null,
  },
  authenticationStatus: UserLoginStates.LOADING,
};

const authenticationReducer = (_state: AuthenticationState, action: AuthenticationAction): AuthenticationState => {
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

const AuthenticationContext: Context<AuthenticationContextValue> = createContext<AuthenticationContextValue>(
  {} as AuthenticationContextValue,
);

/**
 * Manages the fetching of basic details of the logged-in user. The fetch operation is enabled only if a JWT
 * authorization token exists.
 *
 * @param authToken The authorization JWT token if it exists.
 * @returns {UseQueryResult<LoginResponse, UnauthorizedError | FormValidationError | ServerError | UnexpectedError>}
 */
const useGetMe = (authToken: string | null): UseQueryResult<LoginResponse, CoreApiError> => {
  return useQuery({
    queryKey: [queryKeys.account.GET_ME],
    queryFn: () => accountService.getMe(),
    enabled: authToken !== null,
  });
};

/**
 * Defines the application's authentication-related context object.
 */
export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [state, dispatch] = useReducer(authenticationReducer, initialReducerState);

  const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);
  const { data, isError } = useGetMe(authToken);

  const logIn = useCallback((response: LoginResponse) => {
    setLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, response.jwtToken);

    dispatch({
      type: AuthenticationActionTypes.LOG_IN,
      payload: {
        response,
      },
    });
  }, []);

  const logOut = useCallback((): void => {
    removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    dispatch({
      type: AuthenticationActionTypes.LOG_OUT,
    });
  }, []);

  useEffect(() => {
    if (!authToken || isAuthTokenExpired(authToken)) {
      dispatch({
        type: AuthenticationActionTypes.LOG_OUT,
      });
    } else if (data) {
      setLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, data.jwtToken);

      dispatch({
        type: AuthenticationActionTypes.TOKEN_VALIDATION_SUCCESS,
        payload: {
          response: data,
        },
      });
    } else if (isError) {
      removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

      dispatch({
        type: AuthenticationActionTypes.TOKEN_VALIDATION_FAILURE,
      });
    }
  }, [authToken, data, isError]);

  const authContextValues: AuthenticationContextValue = useMemo(
    () => ({
      state,
      logIn,
      logOut,
    }),
    [state, logIn, logOut],
  );

  return <AuthenticationContext value={authContextValues}>{children}</AuthenticationContext>;
};

/**
 * The AuthContext object is wrapped into a simple custom hook for simple usage.
 */
export const useAuthenticationProvider = (): AuthenticationContextValue => useContext(AuthenticationContext);
