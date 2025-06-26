/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useReducer } from 'react';

/* logic imports */
import { useGetMe } from '@daigaku/hooks';
import { AuthenticationActionTypes, authenticationReducer, initialReducerState } from './authentication.reducer';

/* configuration, utilities, constants imports */
import { localStorageKeys } from '@daigaku/constants';
import { isAuthTokenExpired, localStorageUtilities } from '@daigaku/utilities';

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
 * Defines the application's authentication-related context object.
 */
export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [state, dispatch] = useReducer(authenticationReducer, initialReducerState);

  const { data, isError } = useGetMe();

  const logIn = (loginResponse: LoginResponse) => {
    localStorageUtilities.setObjectById(localStorageKeys.AUTHENTICATION_TOKEN, loginResponse.jwtToken);

    dispatch({
      type: AuthenticationActionTypes.LOG_IN,
      payload: {
        response: loginResponse,
      },
    });
  };

  const logOut = (): void => {
    localStorageUtilities.removeObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    dispatch({
      type: AuthenticationActionTypes.LOG_OUT,
    });
  };

  const tokenValidationSucceeded = (loginResponse: LoginResponse) => {
    dispatch({
      type: AuthenticationActionTypes.TOKEN_VALIDATION_SUCCESS,
      payload: {
        response: loginResponse,
      },
    });
  };

  const tokenValidationFailed = () => {
    localStorageUtilities.removeObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    dispatch({
      type: AuthenticationActionTypes.TOKEN_VALIDATION_FAILURE,
    });
  };

  useEffect(() => {
    const authToken: string | null = localStorageUtilities.getObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

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
