/**
 * @prettier
 */

/* external imports */
import { MouseEvent } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* logic imports */
import { AccountRoleValues, AuthContext, AuthStatus, useAuth } from '@context/auth';
import { SmallScreenMenuDisplay, useHandleSmallScreenMenuDisplay } from './private-layout.hooks';

/* component, style imports */
import { GlobalLoadingModal } from '@components/notification';
import { NavigationRoute } from '../navigation-route';
import { PageBottom } from '../page-bottom';
import { Header, SmallScreenMenuToggle, SmallScreenMenuWrapper } from './private-layout.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* utilities imports */
import { NavbarRoute, navigationRoutesByRole, sharedNavigationRoutes } from './private-layout.utilities';

/* interfaces, types, enums */
interface ComponentProps {
  readonly allowedRoles: Array<AccountRoleValues>;
}

/*
 * component - TODO - add functionality description
 */
export const PrivateLayout = ({ allowedRoles }: ComponentProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authStatus, account, logOut }: Partial<AuthContext> = useAuth();
  const { ref, toggleMenu, isNavbarOpen, handleInsideClick, handleOutsideClick }: SmallScreenMenuDisplay =
    useHandleSmallScreenMenuDisplay();

  if (authStatus === AuthStatus.LOADING) {
    return <GlobalLoadingModal message={'The application is compiling your data...'} />;
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
              {navigationRoutesByRole[account.role as AccountRoleValues].map((route: NavbarRoute) => {
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
              {sharedNavigationRoutes.map((route: NavbarRoute) => {
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
