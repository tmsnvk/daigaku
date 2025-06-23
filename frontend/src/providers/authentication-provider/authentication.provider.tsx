/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useReducer } from 'react';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';
import { AuthenticationActionTypes, authenticationReducer, initialReducerState } from './authentication.reducer';

/* configuration, utilities, constants imports */
import { localStorageKeys, queryKeys } from '@daigaku/constants';
import {
  getLocalStorageObjectById,
  isAuthTokenExpired,
  removeLocalStorageObjectById,
  setLocalStorageObjectById,
} from '@daigaku/utilities';

/* interface, type imports */
import { LoginResponse } from '@daigaku/common-types';
import { AuthenticationState } from './authentication.types';

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
const useGetMe = (): UseQueryResult<LoginResponse, CoreApiError> => {
  const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

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

  // const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

  const { data, isError } = useGetMe();

  const logIn = (loginResponse: LoginResponse) => {
    setLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, loginResponse.jwtToken);

    dispatch({
      type: AuthenticationActionTypes.LOG_IN,
      payload: {
        response: loginResponse,
      },
    });
  };

  const logOut = (): void => {
    removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    dispatch({
      type: AuthenticationActionTypes.LOG_OUT,
    });
  };

  const tokenValidationSucceeded = (loginResponse: LoginResponse) => {
    setLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, loginResponse.jwtToken);

    dispatch({
      type: AuthenticationActionTypes.TOKEN_VALIDATION_SUCCESS,
      payload: {
        response: loginResponse,
      },
    });
  };

  const tokenValidationFailed = () => {
    removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    dispatch({
      type: AuthenticationActionTypes.TOKEN_VALIDATION_FAILURE,
    });
  };

  useEffect(() => {
    const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

    if (!authToken || isAuthTokenExpired(authToken)) {
      logOut();
    } else if (data) {
      tokenValidationSucceeded(data);
    } else if (isError) {
      tokenValidationFailed();
    }
  }, [data, isError]);

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
