/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { Context, ReactNode, createContext, useContext, useEffect, useState } from 'react';

/* logic imports */
import { accountService } from '@services/index';

/* configuration, utilities, constants imports */
import { localStorageKeyConstants } from '@constants';

/* interface, type, enum imports */
import { LoginFormResponse } from '@pages/common/home/components/login-form/login-form.hooks';

/**
 * Defines the authentication status options.
 *
 * @since 0.0.1
 */
export enum AuthStatus {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

/**
 * Defines the various account types.
 *
 * @since 0.0.1
 */
export enum AccountRoleValues {
  STUDENT,
  MENTOR,
  INSTITUTION_ADMIN,
  SYSTEM_ADMIN,
}

/**
 * @since 0.0.1
 */
interface AccountRole {
  [key: string]: AccountRoleValues;
}

/**
 * @since 0.0.1
 */
interface AuthContextProviderT {
  children: ReactNode;
}

/**
 * @since 0.0.1
 */
export type Account = {
  email: string;
  firstName: string;
  role: AccountRoleValues | typeof AccountRoleValues;
};

/**
 * Defines the properties of the AuthContext object.
 *
 * @since 0.0.1
 */
export interface AuthContext {
  account: Account;
  setAccount: (value: Account) => void;
  authStatus: AuthStatus;
  setAuthStatus: (value: AuthStatus) => void;
  getAccountRole: (role: string) => AccountRoleValues;
  getRoleResource: () => string;
  logOut: () => void;
}

const initialAccountState: Account = {
  email: '',
  firstName: '',
  role: AccountRoleValues,
};

const AuthContext: Context<AuthContext> = createContext<AuthContext>({} as AuthContext);

/**
 * @since 0.0.1
 */
export const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<Account>(initialAccountState);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.LOADING);

  const getAccountRole = (role: string): AccountRoleValues => {
    const roles: AccountRole = {
      ROLE_STUDENT: AccountRoleValues.STUDENT,
      ROLE_MENTOR: AccountRoleValues.MENTOR,
      ROLE_INSTITUTION_ADMIN: AccountRoleValues.INSTITUTION_ADMIN,
      ROLE_SYSTEM_ADMIN: AccountRoleValues.SYSTEM_ADMIN,
    };

    return roles[role];
  };

  const getRoleResource = (): string => {
    const roleUrl: { [key in AccountRoleValues]: string } = {
      [AccountRoleValues.STUDENT]: 'student',
      [AccountRoleValues.MENTOR]: 'mentor',
      [AccountRoleValues.INSTITUTION_ADMIN]: 'institution-admin',
      [AccountRoleValues.SYSTEM_ADMIN]: 'system-admin',
    };

    return roleUrl[account.role as AccountRoleValues];
  };

  useEffect(() => {
    // The useEffect that activates whenever the user refreshes their browser.
    // The action locally checks for the user's authentication token, then a token authentication request is sent to the server.
    // If the token is unavailable or the server request fails the user is signed out.
    const token: string | null = localStorage.getItem(localStorageKeyConstants.AUTH_TOKEN);

    if (!token) {
      setAuthStatus(AuthStatus.SIGNED_OUT);

      return;
    }

    const getMe = async (): Promise<void> => {
      try {
        const data: LoginFormResponse = await accountService.getMe();

        const loggedInAccount: Account = {
          ...data,
          role: getAccountRole(data.role),
        };

        setAccount(loggedInAccount);
        setAuthStatus(AuthStatus.SIGNED_IN);
      } catch (error) {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      }
    };

    getMe();
  }, []);

  const logOut = (): void => {
    // Logs the user out.
    localStorage.removeItem(localStorageKeyConstants.AUTH_TOKEN);
    setAuthStatus(AuthStatus.SIGNED_OUT);
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        setAccount,
        authStatus,
        setAuthStatus,
        getAccountRole,
        getRoleResource,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * The AuthContext object is wrapped into a custom hook for simplier usage within the application's components.
 *
 * @since 0.0.1
 */
export const useAuth = (): AuthContext => useContext(AuthContext);
