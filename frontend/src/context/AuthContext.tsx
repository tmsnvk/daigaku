import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { axiosConfigWithAuth } from '@configuration';
import { getLocalStorageItem } from '@utilities';

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
}

const AuthContext = createContext<AuthContextT>({} as AuthContextT);

const AuthProvider = ({ children }: AuthContextProviderT) => {
  const [account, setAccount] = useState<AccountDataT>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getMe = async () => {
    try {
      const { data } = await axiosConfigWithAuth.request({
        method: 'GET',
        url: '/api/users/me',
      });

      setAccount(data.accountDataDto);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getLocalStorageItem('token');

    if (!token) {
      setLoading(false);

      return;
    }

    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{
      account, setAccount,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export {
  useAuth,
  AuthProvider,
};
