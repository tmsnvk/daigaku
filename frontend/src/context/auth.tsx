/**
 * @prettier
 */

/* external imports */
import { Context, ReactNode, createContext, useContext, useEffect, useState } from 'react';

/* service imports */
import { accountService } from '@services/index';

/* interface, type, enum imports */
import { LoginFormResponse } from '@pages/common/home/components/login-form/login-form.hooks';

/* interfaces, types, enums */
export enum AuthStatus {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

export enum AccountRoleValues {
  STUDENT,
  MENTOR,
  INSTITUTION_ADMIN,
  SYSTEM_ADMIN,
}

interface AccountRole {
  [key: string]: AccountRoleValues;
}

interface AuthContextProviderT {
  children: ReactNode;
}

export type Account = {
  email: string;
  firstName: string;
  role: AccountRoleValues | typeof AccountRoleValues;
};

export interface AuthContext {
  account: Account;
  setAccount: (value: Account) => void;
  authStatus: AuthStatus;
  setAuthStatus: (value: AuthStatus) => void;
  getAccountRole: (role: string) => AccountRoleValues;
  getRoleResource: (role: AccountRoleValues) => string;
  logOut: () => void;
}

const initialAccountState: Account = {
  email: '',
  firstName: '',
  role: AccountRoleValues,
};

const AuthContext: Context<AuthContext> = createContext<AuthContext>({} as AuthContext);

/*
 * context provider - TODO - add functionality description
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

  const getRoleResource = (role: AccountRoleValues): string => {
    const roleUrl: { [key in AccountRoleValues]: string } = {
      [AccountRoleValues.STUDENT]: 'student',
      [AccountRoleValues.MENTOR]: 'mentor',
      [AccountRoleValues.INSTITUTION_ADMIN]: 'institution-admin',
      [AccountRoleValues.SYSTEM_ADMIN]: 'system-admin',
    };

    return roleUrl[role];
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem('auth-token');

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
    localStorage.removeItem('token');
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

export const useAuth = (): AuthContext => useContext(AuthContext);
