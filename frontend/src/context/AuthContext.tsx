import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { axiosConfigWithAuth } from '@configuration';
import {
  getAuthAccountRole,
  getLocalStorageItem,
} from '@utilities';

export enum AuthStatusE {
  Loading,
  SignedIn,
  SignedOut,
}

export enum AccountRoleE {
  Student,
  Mentor,
  Admin,
}

export type AccountDataT = {
  email: string;
  firstName: string;
  lastName: string;
  registeredAt: string;
  lastUpdatedAt: string;
  accountRole: AccountRoleE | typeof AccountRoleE;
}

type AuthContextProviderT = {
  children: ReactNode;
}

type AuthContextT = {
  account: AccountDataT;
  setAccount: (value: AccountDataT) => void;
  authStatus: AuthStatusE;
  setAuthStatus: (value: AuthStatusE) => void;
}

const initialAccountState = {
  email: '',
  firstName: '',
  lastName: '',
  registeredAt: '',
  lastUpdatedAt: '',
  accountRole: AccountRoleE,
};

const AuthContext = createContext<AuthContextT>({} as AuthContextT);

const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<AccountDataT>(initialAccountState);
  const [authStatus, setAuthStatus] = useState<AuthStatusE>(AuthStatusE.Loading);

  const getMe = async () => {
    try {
      const { data } = await axiosConfigWithAuth.request({
        method: 'GET',
        url: '/api/users/me',
      });

      const userData: AccountDataT = {
        ...data.accountDataDto,
        accountRole: getAuthAccountRole(data.accountRoles),
      };

      setAccount(userData);
      setAuthStatus(AuthStatusE.SignedIn);
    } catch (error) {
      setAuthStatus(AuthStatusE.SignedOut);
    }
  };

  useEffect(() => {
    const token = getLocalStorageItem('token');

    if (!token) {
      setAuthStatus(AuthStatusE.SignedOut);

      return;
    }

    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{
      account, setAccount,
      authStatus, setAuthStatus,
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
