import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  AccountRoleE,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { useHandleSmallScreenMenuDisplay } from './PrivateLayout.hooks.tsx';

import { GlobalLoadingModal } from '@components/notification';
import NavigationRoute from '../NavigationRoute';
import Footer from '../PageBottom';
import {
  Header,
  SmallScreenMenuToggle,
  SmallScreenMenuWrapper,
} from './PrivateLayout.styles.ts';

import { iconLibraryConfig } from '@configuration';
import {
  NavbarRoutesT,
  commonNavigationRoutes,
  roleNavigationRoutes,
} from './PrivateLayout.utilities.ts';

type ComponentPropsT = {
  allowedRoles: AccountRoleE[];
}

const PrivateLayout = ({ allowedRoles }: ComponentPropsT) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authStatus, account, logOut } = useAuth();
  const { ref, toggleMenu, isNavbarOpen, handleInsideClick, handleOutsideClick } = useHandleSmallScreenMenuDisplay();

  if (authStatus === AuthStatusE.LOADING) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (!allowedRoles.includes(account.role as AccountRoleE)) {
    account ?
      navigate('/unauthorised', { state : { from: location }, replace: true }) :
      navigate('/', { replace: true });
  }

  return (
    <>
      <Header>
        <nav>
          <div>
            <NavigationRoute
              resource={'/dashboard'}
              icon={iconLibraryConfig.faGraduationCap}
              content={'Dashboard'}
            />
          </div>
          <SmallScreenMenuWrapper
            ref={ref}
            $isNavbarOpen={isNavbarOpen}
            onMouseDown={handleInsideClick}
            onMouseOut={handleOutsideClick}
            onKeyDown={handleOutsideClick}
          >
            <ul>
              {roleNavigationRoutes[account.role as AccountRoleE].map((route: NavbarRoutesT) => {
                return (
                  <li key={route.url}>
                    <NavigationRoute
                      resource={route.url}
                      icon={route.icon}
                      content={route.content}
                    />
                  </li>
                );
              })}
            </ul>
            <ul>
              {commonNavigationRoutes.map((element) => {
                return (
                  <li key={element.url}>
                    <NavigationRoute
                      resource={element.url}
                      icon={element.icon}
                      content={element.content}
                    />
                  </li>
                );
              })}
              <li>
                <NavigationRoute
                  resource={'/'}
                  icon={iconLibraryConfig.faRightFromBracket}
                  content={'Log out'}
                  handleLogOut={logOut}
                />
              </li>
            </ul>
            <SmallScreenMenuToggle onClick={toggleMenu}>
              <FontAwesomeIcon icon={iconLibraryConfig.faXMark} />
            </SmallScreenMenuToggle>
          </SmallScreenMenuWrapper>
          <SmallScreenMenuToggle onClick={toggleMenu}>
            <FontAwesomeIcon icon={iconLibraryConfig.faBars} />
          </SmallScreenMenuToggle>
        </nav>
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;
