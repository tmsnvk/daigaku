import { Navigate } from 'react-router-dom';
import {
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { AuthNavbar } from '@components/layout';
import { GlobalLoadingModal } from '@components/shared/modal';

const PrivateRoutes = () => {
  const { authStatus } = useAuth();

  if (authStatus === AuthStatusE.Loading) {
    return <GlobalLoadingModal />;
  }

  return (
    authStatus === AuthStatusE.SignedIn ? <AuthNavbar /> : <Navigate to={'/'} replace />
  );
};

export default PrivateRoutes;
