import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { accountService } from '@services/index.ts';

export enum AuthStatusE {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

export enum AccountRoleE {
  STUDENT,
  MENTOR,
  INSTITUTION_ADMIN,
  SYSTEM_ADMIN
}

type AccountRoleT = {
  [key: string]: AccountRoleE;
}

type AuthContextProviderT = {
  children: ReactNode;
}

export type AccountDataT = {
  email: string;
  firstName: string;
  role: AccountRoleE | typeof AccountRoleE;
}

const initialAccountState = {
  email: '',
  firstName: '',
  role: AccountRoleE,
};

type AuthContextT = {
  account: AccountDataT;
  setAccount: (value: AccountDataT) => void;
  authStatus: AuthStatusE;
  setAuthStatus: (value: AuthStatusE) => void;
  getAccountRole: (role: string) => AccountRoleE;
  getRoleResource: (role: AccountRoleE) => string;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextT>({} as AuthContextT);

const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<AccountDataT>(initialAccountState);
  const [authStatus, setAuthStatus] = useState<AuthStatusE>(AuthStatusE.LOADING);

  const getAccountRole = (role: string): AccountRoleE => {
    const roles: AccountRoleT = {
      'ROLE_STUDENT': AccountRoleE.STUDENT,
      'ROLE_MENTOR': AccountRoleE.MENTOR,
      'ROLE_INSTITUTION_ADMIN': AccountRoleE.INSTITUTION_ADMIN,
      'ROLE_SYSTEM_ADMIN': AccountRoleE.SYSTEM_ADMIN,
    };

    return roles[role];
  };

  const getRoleResource = (role: AccountRoleE) => {
    const roleUrl = {
      [AccountRoleE.STUDENT]: 'student',
      [AccountRoleE.MENTOR]: 'mentor',
      [AccountRoleE.INSTITUTION_ADMIN]: 'institution-admin',
      [AccountRoleE.SYSTEM_ADMIN]: 'system-admin',
    };

    return roleUrl[role];
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setAuthStatus(AuthStatusE.SIGNED_OUT);

      return;
    }

    const getMe = async () => {
      try {
        const data = await accountService.getMe();

        const userData: AccountDataT = {
          ...data,
          role: getAccountRole(data.role),
        };

        setAccount(userData);
        setAuthStatus(AuthStatusE.SIGNED_IN);
      } catch (error) {
        setAuthStatus(AuthStatusE.SIGNED_OUT);
      }
    };

    getMe();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuthStatus(AuthStatusE.SIGNED_OUT);
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

const useAuth = () => useContext(AuthContext);

export {
  useAuth,
  AuthProvider,
};
