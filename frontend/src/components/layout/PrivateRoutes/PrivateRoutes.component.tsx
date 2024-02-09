import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  AuthStatus,
  useAuth,
} from '@context/AuthContext.tsx';
import { GlobalLoadingModal } from '@components/shared/modal';

const PrivateRoutes = () => {
  const { authStatus } = useAuth();

  if (authStatus === AuthStatus.Loading) {
    return <GlobalLoadingModal />;
  }

  return (
    authStatus === AuthStatus.SignedIn ? <Outlet /> : <Navigate to={'/'} replace />
  );
};

export default PrivateRoutes;
