import {
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  AccountRoleE,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import Footer from '../Footer';
import { GlobalLoadingModal } from '@components/shared/modal';
import { GeneralIcon } from '@components/shared/icon-styles';
import { iconLibraryConfig } from '@configuration';
import {
  NavbarContentT,
  navbarContent,
} from './PrivateLayout.utilities.ts';

const PrivateLayout = () => {
  const { authStatus, account } = useAuth();

  if (authStatus === AuthStatusE.Loading) {
    return <GlobalLoadingModal />;
  }

  if (authStatus === AuthStatusE.SignedOut) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      <DefaultNavbarStyles>
        <nav>
          <div>
            <GeneralIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </div>
          <ul>
            <li>
              <Link to={'/dashboard'}>
                <GeneralIcon icon={iconLibraryConfig.faHouseUser} />
                Dashboard
              </Link>
            </li>
            {navbarContent[account.accountRole as AccountRoleE].map((element: NavbarContentT) => {
              return (
                <li key={element.url}>
                  <Link to={element.url}>
                    <GeneralIcon icon={element.icon} />
                    {element.content}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to={'/logout'}>
                <GeneralIcon icon={iconLibraryConfig.faRightFromBracket} />
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </DefaultNavbarStyles>
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;
