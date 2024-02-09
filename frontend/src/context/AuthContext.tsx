import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { axiosConfigWithAuth } from '@configuration';
import { getLocalStorageItem } from '@utilities';

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut
}

export type AccountDataT = {
  email: string;
  firstName: string;
  lastName: string;
  registeredAt: string;
  lastUpdatedAt: string;
} | null;

type AuthContextProviderT = {
  children: ReactNode;
}

type AuthContextT = {
  account: AccountDataT;
  setAccount: (value: AccountDataT) => void;
  authStatus: AuthStatus;
  setAuthStatus: (value: AuthStatus) => void;
}

const AuthContext = createContext<AuthContextT>({} as AuthContextT);

const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<AccountDataT>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Loading);

  const getMe = async () => {
    try {
      const { data } = await axiosConfigWithAuth.request({
        method: 'GET',
        url: '/api/users/me',
      });

      setAccount(data.accountDataDto);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (error) {
      setAuthStatus(AuthStatus.SignedOut);
    }
  };

  useEffect(() => {
    const token = getLocalStorageItem('token');

    if (!token) {
      setAuthStatus(AuthStatus.SignedOut);

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
