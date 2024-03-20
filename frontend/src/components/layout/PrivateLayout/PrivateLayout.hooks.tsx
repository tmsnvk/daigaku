import {
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';

const useLogOut = () => {
  const { setAuthStatus } = useAuth();

  const logOut = () => {
    localStorage.removeItem('token');
    setAuthStatus(AuthStatusE.SIGNED_OUT);
  };

  return {
    logOut,
  };
};

export {
  useLogOut,
};
