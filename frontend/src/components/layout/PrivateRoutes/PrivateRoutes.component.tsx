import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  AuthStatus,
  useAuth,
} from '@context/AuthContext.tsx';

const PrivateRoutes = () => {
  const { authStatus } = useAuth();

  if (authStatus === AuthStatus.Loading) {
    return <div>Replace this with a proper loading component...</div>;
  }

  return (
    authStatus === AuthStatus.SignedIn ? <Outlet /> : <Navigate to={'/'} replace />
  );
};

export default PrivateRoutes;
