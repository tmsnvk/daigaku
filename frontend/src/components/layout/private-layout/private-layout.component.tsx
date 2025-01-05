/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX, useEffect } from 'react';
import { Location, NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoleValues, AuthContext, AuthStatus, useAuthContext } from '@context/auth';
import { useSmallScreenNavbarDisplay } from './private-layout.hooks';

/* component, style imports */
import { GlobalLoadingModal } from '@components/notification';
import { NavigationRoute } from '../navigation-route';
import { PageFooter } from '../page-footer';
import { Header, SmallScreenMenuToggle, SmallScreenMenuWrapper } from './private-layout.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { constants } from './private-layout.constants';
import { accountRoleNavigationRoutes, sharedNavigationRoutes } from './private-layout.utilities';

/* interface, type, enum imports */
import { NavbarRoute, SmallScreenNavbarDisplay } from './private-layout.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The list of roles permitted to view this layout.
   */
  readonly allowedRoles: Array<AccountRoleValues>;
}

/**
 * Renders navigation links for authorised users. Users with different authorisation level might see different navigation links.
 * Unauthorised users are redirected.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const PrivateLayout = ({ allowedRoles }: ComponentProps): JSX.Element => {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { authStatus, account, logOut }: AuthContext = useAuthContext();
  const { isNavbarOpen, toggleNavbar, handleOnFocus, handleOnBlur }: SmallScreenNavbarDisplay = useSmallScreenNavbarDisplay();

  useEffect(() => {
    if (account.email === '' && account.firstName === '') {
      return;
    }

    if (!allowedRoles.includes(account.role as AccountRoleValues)) {
      const redirectPath = account ? '/unauthorised' : '/';

      navigate(redirectPath, { state: { from: location }, replace: true });
    }
  }, [account]);

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
              {accountRoleNavigationRoutes[account.role as AccountRoleValues].map((route: NavbarRoute) => {
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
                  onNavigateClick={() => logOut()}
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
