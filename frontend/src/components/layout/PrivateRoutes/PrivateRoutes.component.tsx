import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { GlobalLoadingModal } from '@components/shared/modal';

const PrivateRoutes = () => {
  const { authStatus } = useAuth();

  if (authStatus === AuthStatusE.Loading) {
    return <GlobalLoadingModal />;
  }

  return (
    authStatus === AuthStatusE.SignedIn ? <Outlet /> : <Navigate to={'/'} replace />
  );
};

export default PrivateRoutes;
