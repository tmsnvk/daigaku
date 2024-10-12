/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
 * The interface represents the properties of the {@link PrivateLayout} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly allowedRoles: Array<AccountRoleValues>;
}

/**
 * The layout component renders navigation and content for authorised users. Unauthorised users are redirected.
 *
 * @param {ComponentProps} props
 * @param props.allowedRoles The list of roles permitted to view this layout.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const PrivateLayout = ({ allowedRoles }: ComponentProps): JSX.Element => {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const { authStatus, account, logOut }: Partial<AuthContext> = useAuth();
  const { isNavbarOpen, toggleNavbar, handleOnFocus, handleOnBlur }: SmallScreenNavbarDisplay = useSmallScreenNavbarDisplay();

  if (!allowedRoles.includes(account.role as AccountRoleValues)) {
    account ? navigate('/unauthorised', { state: { from: location }, replace: true }) : navigate('/', { replace: true });
  }

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
