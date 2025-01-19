/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

/* logic imports */
import { accountService } from '@services';

/* configuration, utilities, constants imports */
import { localStorageKeys } from '@constants';
import { getLocalStorageObjectById, removedLocalStorageObjectById } from '@utilities';

/* interface, type, enum imports */
import { LoginResponse } from '@common-types';

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
export interface Account {
  email: string;
  firstName: string;
  role: AccountRoles | null;
  jwtToken: string;
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

/**
 * Decodes a base64-encoded JWT token and returns the payload.
 *
 * @param token The JWT token string.
 * @returns The decoded payload object.
 */
const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decodedString = atob(base64);

  return JSON.parse(decodedString);
};

/**
 * Checks if the JWT token has expired.
 *
 * @param token The JWT token string.
 * @returns true if the token is expired, false otherwise.
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJwt(token);
    const expirationTime: number = decoded.exp * 1000;
    const currentTime: number = Date.now();

    return currentTime >= expirationTime;
  } catch (error) {
    return true;
  }
};

const AuthContext: Context<AuthContext> = createContext<AuthContext>({} as AuthContext);

/**
 * Defines the application's authentication-related context object.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account>({ email: '', firstName: '', role: null, jwtToken: '' });
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.LOADING);

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

  const updateAccountContextDetails = (details: LoginResponse) => {
    const loggedInAccountDetails: Account = {
      ...details,
      role: getAccountRole(details.role),
    };

    setAccount(loggedInAccountDetails);
    setAuthStatus(AuthStatus.SIGNED_IN);
  };

  const logOut = (): void => {
    removedLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN);
    setAccount({ email: '', firstName: '', role: null, jwtToken: '' });
    setAuthStatus(AuthStatus.SIGNED_OUT);
  };

  useEffect(() => {
    // The useEffect that activates whenever the user refreshes their browser.
    // The action locally checks for the user's authentication token, then a token authentication request is sent to the server.
    // If the token is unavailable or the server request fails the user is signed out.
    const token: string | null = getLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

    if (!token || isTokenExpired(token)) {
      setAuthStatus(AuthStatus.SIGNED_OUT);

      return;
    }

    const getMe = async (): Promise<void> => {
      try {
        const data: LoginResponse = await accountService.getMe();

        updateAccountContextDetails(data);
      } catch (error) {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      }
    };

    getMe();
  }, []);

  const authContextValues = useMemo(
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
