/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Context, ReactNode, createContext, startTransition, useContext, useEffect, useMemo, useState } from 'react';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { localStorageKeys, queryKeys } from '@daigaku/constants';
import { getLocalStorageObjectById, isAuthTokenExpired, removeLocalStorageObjectById } from '@daigaku/utilities';

/* interface, type imports */
import { LoginResponse, UserLoginState, UserLoginStates, UserRole, UserRoles } from '@daigaku/common-types';

/**
 * Defines the properties of the data associated with the logged-in user.
 */
interface Account {
  email: string;
  firstName: string;
  jwtToken: string;
  role: UserRole | null;
}

/**
 * Defines the properties of the AuthenticationContext context object.
 */
interface AuthenticationContext {
  account: Account;
  authStatus: UserLoginState;
  updateAccountContextDetails: (details: LoginResponse) => void;
  getRoleResource: () => string;
  logOut: () => void;
}

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

const initialState: Account = {
  email: '',
  firstName: '',
  role: null,
  jwtToken: '',
};

const roleResources: Record<UserRole, string> = {
  [UserRoles.ROLE_STUDENT]: 'student',
  [UserRoles.ROLE_MENTOR]: 'mentor',
  [UserRoles.ROLE_INSTITUTION_ADMIN]: 'institution-admin',
  [UserRoles.ROLE_SYSTEM_ADMIN]: 'system-admin',
};

const AuthenticationContext: Context<AuthenticationContext> = createContext<AuthenticationContext>(
  {} as AuthenticationContext,
);

/**
 * Defines the application's authentication-related context object.
 */
export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account>(initialState);
  const [authStatus, setAuthStatus] = useState<UserLoginState>(UserLoginStates.LOADING);

  const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);
  const { data, isLoading, isError } = useGetMe(authToken);

  const getRoleResource = (): string => {
    return roleResources[account.role as UserRole];
  };

  const updateAccountContextDetails = (details: LoginResponse) => {
    setAccount(details);
    setAuthStatus(UserLoginStates.LOGGED_IN);
  };

  const logOut = (): void => {
    removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    startTransition(() => {
      setAuthStatus(UserLoginStates.LOGGED_OUT);
      setAccount(initialState);
    });
  };

  useEffect(() => {
    if (authStatus === UserLoginStates.LOGGED_OUT) {
      return;
    }

    if (isError || !authToken || isAuthTokenExpired(authToken)) {
      setAuthStatus(UserLoginStates.LOGGED_OUT);
    }

    if (isLoading) {
      setAuthStatus(UserLoginStates.LOADING);
    }

    if (data) {
      updateAccountContextDetails(data);
    }
  }, [isError, isLoading, authToken, authStatus, data]);

  const authContextValues: AuthenticationContext = useMemo(
    () => ({
      account,
      authStatus,
      updateAccountContextDetails,
      getRoleResource,
      logOut,
    }),
    [account, authStatus],
  );

  return <AuthenticationContext value={authContextValues}>{children}</AuthenticationContext>;
};

/**
 * The AuthContext object is wrapped into a simple custom hook for simpler usage.
 */
export const useAuthenticationProvider = (): AuthenticationContext => useContext(AuthenticationContext);
