/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { Location, NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoleValues, AuthContext, AuthStatus, useAuth } from '@context/auth';
import { SmallScreenNavbarDisplay, useSmallScreenNavbarDisplay } from './private-layout.hooks';

/* component, style imports */
import { GlobalLoadingModal } from '@components/notification';
import { NavigationRoute } from '../navigation-route';
import { PageFooter } from '../page-footer';
import { Header, SmallScreenMenuToggle, SmallScreenMenuWrapper } from './private-layout.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { constants } from './private-layout.constants';
import { NavbarRoute, navigationRoutesByRole, sharedNavigationRoutes } from './private-layout.utilities';

/**
 * ===============
 * Component {@link PrivateLayout}
 * ===============
 */

/**
 * Defines the properties of the {@link PrivateLayout} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The list of roles permitted to view this layout.
   */
  readonly allowedRoles: Array<AccountRoleValues>;
}

/**
 * Renders navigation and content for authorised users.
 * Unauthorised users are redirected.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const PrivateLayout = ({ allowedRoles }: ComponentProps): JSX.Element => {
  // `react-router-dom` location object.
  const location: Location = useLocation();

  // `react-router-dom` navigate object.
  const navigate: NavigateFunction = useNavigate();

  // Authentication context.
  const { authStatus, account, logOut }: Partial<AuthContext> = useAuth();

  // Custom hook that manages small screen navbar display state.
  const { isNavbarOpen, toggleNavbar, handleOnFocus, handleOnBlur }: SmallScreenNavbarDisplay = useSmallScreenNavbarDisplay();

  // Redirect unauthorised users.
  if (!allowedRoles.includes(account.role as AccountRoleValues)) {
    const redirectPath = account ? '/unauthorised' : '/';
    navigate(redirectPath, { state: { from: location }, replace: true });
  }

  // Show loading modal while authentication status is AuthStatus.LOADING.
  if (authStatus === AuthStatus.LOADING) {
    return (
      <GlobalLoadingModal
        isVisible={true}
        loadingText={constants.ui.LOADING_TEXT}
      />
    );
  }

  return (
    <>
      <Header>
        <nav>
          <div>
            <NavigationRoute
              resource={'/dashboard'}
              icon={iconLibraryConfig.faGraduationCap}
              label={constants.routes.shared.dashboard.LABEL}
            />
          </div>
          <SmallScreenMenuWrapper
            $isNavbarOpen={isNavbarOpen}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          >
            <ul>
              {navigationRoutesByRole[account.role as AccountRoleValues].map((route: NavbarRoute) => {
                return (
                  <li key={route.url}>
                    <NavigationRoute
                      resource={route.url}
                      icon={route.icon}
                      label={route.label}
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
                      label={route.label}
                    />
                  </li>
                );
              })}
              <li>
                <NavigationRoute
                  resource={'/'}
                  icon={iconLibraryConfig.faRightFromBracket}
                  label={constants.routes.shared.logOut.LABEL}
                  onLogOutClick={() => logOut()}
                />
              </li>
            </ul>
            <SmallScreenMenuToggle onClick={() => toggleNavbar()}>
              <FontAwesomeIcon icon={iconLibraryConfig.faXMark} />
            </SmallScreenMenuToggle>
          </SmallScreenMenuWrapper>
          <SmallScreenMenuToggle onClick={() => toggleNavbar()}>
            <FontAwesomeIcon icon={iconLibraryConfig.faBars} />
          </SmallScreenMenuToggle>
        </nav>
      </Header>
      <Outlet />
      <PageFooter />
    </>
  );
};
