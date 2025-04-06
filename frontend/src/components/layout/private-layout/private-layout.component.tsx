/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoles, AuthStatus, useAuthContext } from '@context/auth';
import { useSmallScreenNavbarDisplay } from './private-layout.hooks';

/* component, style imports */
import { LoadingModal } from '@components/notification';
import { Footer } from '../footer';
import { NavigationRoute } from '../navigation-route';
import { Header, SmallScreenMenuToggle, SmallScreenMenuWrapper } from './private-layout.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { localization as l } from '@constants';
import { accountRoleNavigationRoutes, sharedNavigationRoutes } from './private-layout.utilities';

/* interface, type, enum imports */
import { NavbarRoute } from './private-layout.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The list of roles permitted to view this layout.
   */
  readonly allowedRoles: Array<AccountRoles>;
}

/**
 * Renders navigation links for authorised users. Users with different authorisation level might see different navigation links.
 * Unauthorised users are redirected to the root page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const PrivateLayout = ({ allowedRoles }: ComponentProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authStatus, account, logOut } = useAuthContext();
  const { isNavbarOpen, toggleNavbar, handleOnFocus, handleOnBlur } = useSmallScreenNavbarDisplay();

  useEffect(() => {
    if (account.role === null) {
      return;
    }

    if (!allowedRoles.includes(account.role as AccountRoles)) {
      const redirectPath = account ? '/unauthorised' : '/';

      navigate(redirectPath, { state: { from: location }, replace: true });
    }
  }, [account]);

  if (authStatus === AuthStatus.LOADING) {
    return (
      <LoadingModal
        isVisible={true}
        status={l.LAYOUT.PRIVATE_LAYOUT.NOTIFICATIONS.LOADING_TEXT}
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
              label={l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.DASHBOARD.LABEL}
            />
          </div>
          <SmallScreenMenuWrapper
            $isNavbarOpen={isNavbarOpen}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          >
            <ul>
              {accountRoleNavigationRoutes[account.role as AccountRoles].map((route: NavbarRoute) => {
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
                  label={l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.LOG_OUT.LABEL}
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
      <Footer />
    </>
  );
};
