import {
  NavLink,
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
import { GeneralIcon } from '@components/shared/icon-styles';
import theme from '@theme/theme.ts';
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

  if (authStatus === AuthStatusE.Loading) {
    return <GlobalLoadingModal />;
  }

  if (!allowedRoles?.includes(account.accountRole as AccountRoleE)) {
    if (account) {
      return <Navigate to={'/unauthorised'} state={{ from: location }} replace />;
    }

    return <Navigate to={'/login'} state={{ from: location }} replace />;
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
              <NavLink
                to={'/dashboard'}
                style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
              >
                <GeneralIcon icon={iconLibraryConfig.faHouseUser} />
                Dashboard
              </NavLink>
            </li>
            {navbarContent[account.accountRole as AccountRoleE].map((element: NavbarContentT) => {
              return (
                <li key={element.url}>
                  <NavLink
                    to={element.url}
                    style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
                  >
                    <GeneralIcon icon={element.icon} />
                    {element.content}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <NavLink
                to={'/'}
                style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
                onClick={logOut}
              >
                <GeneralIcon icon={iconLibraryConfig.faRightFromBracket} />
                Log out
              </NavLink>
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
