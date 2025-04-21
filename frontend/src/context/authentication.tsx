/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';
import { Context, ReactNode, createContext, startTransition, useContext, useEffect, useMemo, useState } from 'react';

/* logic imports */
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';
import { localStorageKeys } from '@daigaku/constants';
import { getLocalStorageObjectById, isAuthTokenExpired, removeLocalStorageObjectById } from '@daigaku/utilities';

/* interface, type, enum imports */
import { LoginResponse, SimpleQueryResult, UserLoginState, UserRole } from '@daigaku/common-types';

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
 * Defines the properties of the AuthContext context object.
 */
interface AuthContext {
  account: Account;
  authStatus: UserLoginState;
  updateAccountContextDetails: (details: LoginResponse) => void;
  getRoleResource: () => string;
  logOut: () => void;
}

/**
 * Manages the fetching of basic details of the logged in user. The fetch operation is enabled only if a JWT
 * authorisation token exists.
 *
 * @param authToken The authorisation JWT token if it exists.
 * @returns {SimpleQueryResult<LoginResponse>}
 */
const useGetMe = (authToken: string | null): SimpleQueryResult<LoginResponse> => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT.GET_ME],
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
  [UserRole.ROLE_STUDENT]: 'student',
  [UserRole.ROLE_MENTOR]: 'mentor',
  [UserRole.ROLE_INSTITUTION_ADMIN]: 'institution-admin',
  [UserRole.ROLE_SYSTEM_ADMIN]: 'system-admin',
};

const AuthContext: Context<AuthContext> = createContext<AuthContext>({} as AuthContext);

/**
 * Defines the application's authentication-related context object.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account>(initialState);
  const [authStatus, setAuthStatus] = useState<UserLoginState>(UserLoginState.LOADING);

  const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);
  const { data, isLoading, isError } = useGetMe(authToken);

  const getRoleResource = (): string => {
    return roleResources[account.role as UserRole];
  };

  const updateAccountContextDetails = (details: LoginResponse) => {
    setAccount(details);
    setAuthStatus(UserLoginState.SIGNED_IN);
  };

  const logOut = (): void => {
    removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    startTransition(() => {
      setAuthStatus(UserLoginState.SIGNED_OUT);
      setAccount(initialState);
    });
  };

  useEffect(() => {
    if (authStatus === UserLoginState.SIGNED_OUT) {
      return;
    }

    if (isError || !authToken || isAuthTokenExpired(authToken)) {
      setAuthStatus(UserLoginState.SIGNED_OUT);
    }

    if (isLoading) {
      setAuthStatus(UserLoginState.LOADING);
    }

    if (data) {
      updateAccountContextDetails(data);
    }
  }, [isError, isLoading, authToken, authStatus, data]);

  const authContextValues: AuthContext = useMemo(
    () => ({
      account,
      authStatus,
      updateAccountContextDetails,
      getRoleResource,
      logOut,
    }),
    [account, authStatus],
  );

  return <AuthContext value={authContextValues}>{children}</AuthContext>;
};

/**
 * The AuthContext object is wrapped into a simple custom hook for simplier usage.
 */
export const useAuthContext = (): AuthContext => useContext(AuthContext);
