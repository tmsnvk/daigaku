import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { accountService } from '@services/index';

import { LoginFormReturnData } from '@pages/common/home/components/login-form/login-form.hooks';

export enum AuthStatus {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

export enum AccountRoleValues {
  STUDENT,
  MENTOR,
  INSTITUTION_ADMIN,
  SYSTEM_ADMIN
}

interface AccountRole {
  [key: string]: AccountRoleValues;
}

interface AuthContextProviderT {
  children: ReactNode;
}

export type AccountData = {
  email: string;
  firstName: string;
  role: AccountRoleValues | typeof AccountRoleValues;
}

const initialAccountState: AccountData = {
  email: '',
  firstName: '',
  role: AccountRoleValues,
};

export interface AuthContext {
  account: AccountData;
  setAccount: (value: AccountData) => void;
  authStatus: AuthStatus;
  setAuthStatus: (value: AuthStatus) => void;
  getAccountRole: (role: string) => AccountRoleValues;
  getRoleResource: (role: AccountRoleValues) => string;
  logOut: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<AccountData>(initialAccountState);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.LOADING);

  const getAccountRole = (role: string): AccountRoleValues => {
    const roles: AccountRole = {
      'ROLE_STUDENT': AccountRoleValues.STUDENT,
      'ROLE_MENTOR': AccountRoleValues.MENTOR,
      'ROLE_INSTITUTION_ADMIN': AccountRoleValues.INSTITUTION_ADMIN,
      'ROLE_SYSTEM_ADMIN': AccountRoleValues.SYSTEM_ADMIN,
    };

    return roles[role];
  };

  const getRoleResource = (role: AccountRoleValues): string => {
    const roleUrl = {
      [AccountRoleValues.STUDENT]: 'student',
      [AccountRoleValues.MENTOR]: 'mentor',
      [AccountRoleValues.INSTITUTION_ADMIN]: 'institution-admin',
      [AccountRoleValues.SYSTEM_ADMIN]: 'system-admin',
    };

    return roleUrl[role];
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      setAuthStatus(AuthStatus.SIGNED_OUT);

      return;
    }

    const getMe = async (): Promise<void> => {
      try {
        const data: LoginFormReturnData = await accountService.getMe();

        const userData: AccountData = {
          ...data,
          role: getAccountRole(data.role),
        };

        setAccount(userData);
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
    <AuthContext.Provider value={{
      account, setAccount,
      authStatus, setAuthStatus,
      getAccountRole,
      getRoleResource,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContext => useContext(AuthContext);

export {
  useAuth,
  AuthProvider,
};
