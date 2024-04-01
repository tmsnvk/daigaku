import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { axiosConfigWithAuth } from '@configuration';

export enum AuthStatusE {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

export enum AccountRoleE {
  STUDENT,
  MENTOR,
  ADMIN,
}

export type AccountDataT = {
  email: string;
  firstName: string;
  lastName: string;
  registeredAt: string;
  lastUpdatedAt: string;
  role: AccountRoleE | typeof AccountRoleE;
}

type AccountRoleT = {
  [key: string]: AccountRoleE;
}

type AuthContextProviderT = {
  children: ReactNode;
}

type AuthContextT = {
  account: AccountDataT;
  setAccount: (value: AccountDataT) => void;
  authStatus: AuthStatusE;
  setAuthStatus: (value: AuthStatusE) => void;
  getAccountRole: (role: string) => AccountRoleE;
}

const initialAccountState = {
  email: '',
  firstName: '',
  lastName: '',
  registeredAt: '',
  lastUpdatedAt: '',
  role: AccountRoleE,
};

const AuthContext = createContext<AuthContextT>({} as AuthContextT);

const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<AccountDataT>(initialAccountState);
  const [authStatus, setAuthStatus] = useState<AuthStatusE>(AuthStatusE.LOADING);

  const getAccountRole = (role: string): AccountRoleE => {
    const roles: AccountRoleT = {
      'ROLE_STUDENT': AccountRoleE.STUDENT,
      'ROLE_MENTOR': AccountRoleE.MENTOR,
      'ROLE_ADMIN': AccountRoleE.ADMIN,
    };

    return roles[role];
  };

  const getMe = async () => {
    try {
      const { data } = await axiosConfigWithAuth.request({
        method: 'GET',
        url: '/api/accounts/me',
      });

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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setAuthStatus(AuthStatusE.SIGNED_OUT);

      return;
    }

    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{
      account, setAccount,
      authStatus, setAuthStatus,
      getAccountRole,
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
