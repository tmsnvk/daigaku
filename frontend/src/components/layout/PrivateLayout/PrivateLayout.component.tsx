import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import {
  AccountRoleE,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { useLogOut } from './PrivateLayout.hooks.tsx';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import Footer from '../Footer';
import { GlobalLoadingModal } from '@components/shared/modal';
import NavbarLink from '@components/shared/navigation';
import { GeneralIcon } from '@components/shared/icon-styles';
import { iconLibraryConfig } from '@configuration';
import {
  NavbarContentT,
  navbarContent,
} from './PrivateLayout.utilities.ts';

type ComponentPropsT = {
  allowedRoles: AccountRoleE[];
}

const PrivateLayout = ({ allowedRoles }: ComponentPropsT) => {
  const location = useLocation();
  const { authStatus, account } = useAuth();
  const { logOut } = useLogOut();

  if (authStatus === AuthStatusE.LOADING) {
    return <GlobalLoadingModal />;
  }

  if (!allowedRoles?.includes(account.role as AccountRoleE)) {
    if (account) {
      return <Navigate to={'/unauthorised'} state={{ from: location }} replace />;
    }

    return <Navigate to={'/'} state={{ from: location }} replace />;
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
              <NavbarLink
                resource={'/dashboard'}
                icon={iconLibraryConfig.faHouseUser}
                content={'Dashboard'}
              />
            </li>
            {navbarContent[account.role as AccountRoleE].map((element: NavbarContentT) => {
              return (
                <li key={element.url}>
                  <NavbarLink
                    resource={element.url}
                    icon={element.icon}
                    content={element.content}
                  />
                </li>
              );
            })}
            <li>
              <NavbarLink
                resource={'/'}
                icon={iconLibraryConfig.faRightFromBracket}
                content={'Log out'}
                onClick={logOut}
              />
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
