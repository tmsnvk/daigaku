/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';
import { Context, ReactNode, createContext, startTransition, useContext, useEffect, useMemo, useState } from 'react';

/* logic imports */
import { accountService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';
import { localStorageKeys } from '@constants';
import { getLocalStorageObjectById, isAuthTokenExpired, removeLocalStorageObjectById } from '@utilities';

/* interface, type, enum imports */
import { LoginResponse, SimpleQueryResult } from '@common-types';

/**
 * Defines the authentication status options.
 */
export enum AuthStatus {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

/**
 * Defines the various account types.
 */
export enum AccountRoles {
  STUDENT,
  MENTOR,
  INSTITUTION_ADMIN,
  SYSTEM_ADMIN,
}

/**
 * Defines the properties of the data associated with the logged-in user.
 */
interface Account {
  email: string;
  firstName: string;
  jwtToken: string;
  role: AccountRoles | null;
}

/**
 * Defines the properties of the AuthContext context object.
 */
interface AuthContext {
  account: Account;
  authStatus: AuthStatus;
  updateAccountContextDetails: (details: LoginResponse) => void;
  getRoleResource: () => string;
  logOut: () => void;
}

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

const AuthContext: Context<AuthContext> = createContext<AuthContext>({} as AuthContext);

/**
 * Defines the application's authentication-related context object.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account>(initialState);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.LOADING);

  const authToken: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);
  const { data, isLoading, isError } = useGetMe(authToken);

  const getAccountRole = (role: string): AccountRoles => {
    const roles: { [key: string]: AccountRoles } = {
      ROLE_STUDENT: AccountRoles.STUDENT,
      ROLE_MENTOR: AccountRoles.MENTOR,
      ROLE_INSTITUTION_ADMIN: AccountRoles.INSTITUTION_ADMIN,
      ROLE_SYSTEM_ADMIN: AccountRoles.SYSTEM_ADMIN,
    };

    return roles[role];
  };

  const getRoleResource = (): string => {
    const roleUrl: { [key in AccountRoles]: string } = {
      [AccountRoles.STUDENT]: 'student',
      [AccountRoles.MENTOR]: 'mentor',
      [AccountRoles.INSTITUTION_ADMIN]: 'institution-admin',
      [AccountRoles.SYSTEM_ADMIN]: 'system-admin',
    };

    return roleUrl[account.role as AccountRoles];
  };

  const updateAccountContextDetails = (details: LoginResponse): void => {
    const loggedInAccountDetails: Account = {
      ...details,
      role: getAccountRole(details.role),
    };

    setAccount(loggedInAccountDetails);
    setAuthStatus(AuthStatus.SIGNED_IN);
  };

  const logOut = (): void => {
    removeLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);

    startTransition(() => {
      setAuthStatus(AuthStatus.SIGNED_OUT);
      setAccount(initialState);
    });
  };

  useEffect(() => {
    if (authStatus === AuthStatus.SIGNED_OUT) {
      return;
    }

    if (isError || !authToken || isAuthTokenExpired(authToken)) {
      setAuthStatus(AuthStatus.SIGNED_OUT);
    }

    if (isLoading) {
      setAuthStatus(AuthStatus.LOADING);
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
