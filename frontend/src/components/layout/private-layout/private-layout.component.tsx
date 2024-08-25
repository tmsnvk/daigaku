/**
 * @prettier
 */

import { MouseEvent } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AccountRoleValues, AuthContext, AuthStatus, useAuth } from '@context/auth';
import { HandleSmallScreenMenuDisplayHook, useHandleSmallScreenMenuDisplay } from './private-layout.hooks';

import { GlobalLoadingModal } from '@components/notification';
import { NavigationRoute } from '../navigation-route/index';
import { PageBottom } from '../page-bottom/index';
import { Header, SmallScreenMenuToggle, SmallScreenMenuWrapper } from './private-layout.styles';

import { iconLibraryConfig } from '@configuration';
import { NavbarRoute, commonNavigationRoutes, roleNavigationRoutes } from './private-layout.utilities';

interface ComponentPropsT {
  readonly allowedRoles: Array<AccountRoleValues>;
}

export const PrivateLayout = ({ allowedRoles }: ComponentPropsT) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authStatus, account, logOut }: Partial<AuthContext> = useAuth();
  const { ref, toggleMenu, isNavbarOpen, handleInsideClick, handleOutsideClick }: HandleSmallScreenMenuDisplayHook =
    useHandleSmallScreenMenuDisplay();

  if (authStatus === AuthStatus.LOADING) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (!allowedRoles.includes(account.role as AccountRoleValues)) {
    account ? navigate('/unauthorised', { state: { from: location }, replace: true }) : navigate('/', { replace: true });
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
            $isNavbarOpen={isNavbarOpen}
            ref={ref}
            onMouseDown={(event: MouseEvent<HTMLDivElement>) => handleInsideClick(event)}
            onMouseOut={() => handleOutsideClick()}
            onKeyDown={() => handleOutsideClick()}
          >
            <ul>
              {roleNavigationRoutes[account.role as AccountRoleValues].map((route: NavbarRoute) => {
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
              {commonNavigationRoutes.map((route: NavbarRoute) => {
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
              <li>
                <NavigationRoute
                  resource={'/'}
                  icon={iconLibraryConfig.faRightFromBracket}
                  content={'Log out'}
                  handleLogOut={() => logOut()}
                />
              </li>
            </ul>
            <SmallScreenMenuToggle onClick={() => toggleMenu()}>
              <FontAwesomeIcon icon={iconLibraryConfig.faXMark} />
            </SmallScreenMenuToggle>
          </SmallScreenMenuWrapper>
          <SmallScreenMenuToggle onClick={() => toggleMenu()}>
            <FontAwesomeIcon icon={iconLibraryConfig.faBars} />
          </SmallScreenMenuToggle>
        </nav>
      </Header>
      <Outlet />
      <PageBottom />
    </>
  );
};
