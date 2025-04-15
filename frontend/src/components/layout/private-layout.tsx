/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoles, AuthStatus, useAuthContext } from '@context/auth.tsx';
import { useMobileView, useSmallScreenNavbarDisplay } from '@hooks';

/* component, style imports */
import { LoadingModal } from '../notification';
import { Footer } from './footer.tsx';
import { NavigationRoute } from './navigation-route.tsx';
import { NavigationBarWrapper } from './navigation-bar-wrapper.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { localization as l } from '@constants';
import { joinTw } from '@utilities';

/* interface, type, enum imports */
import { NavigationRouteItem } from '@common-types';
import { CoreIcon } from '../core-icon.tsx';

/**
 * Defines shared navigation routes accessible to all authenticated users.
 */
export const sharedNavigationRoutes: Array<NavigationRouteItem> = [
  {
    targetUrlString: '/account',
    icon: iconLibraryConfig.faUser,
    label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.MY_ACCOUNT.LABEL,
  },
  {
    targetUrlString: '/messages',
    icon: iconLibraryConfig.faEnvelope,
    label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.MESSAGES.LABEL,
  },
  {
    targetUrlString: '/feedback',
    icon: iconLibraryConfig.faGears,
    label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.FEEDBACK.LABEL,
  },
];

/**
 * Defines navigation routes based on the authorisation role.
 */
export const accountRoleNavigationRoutes: { [key in AccountRoles]: Array<NavigationRouteItem> } = {
  [AccountRoles.ROLE_STUDENT]: [
    {
      targetUrlString: '/new-application',
      icon: iconLibraryConfig.faFileCirclePlus,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.STUDENT.NEW_APPLICATION.LABEL,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.STUDENT.MY_APPLICATIONS.LABEL,
    },
  ],
  [AccountRoles.ROLE_MENTOR]: [
    {
      targetUrlString: '/my-students',
      icon: iconLibraryConfig.faUserGroup,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.MENTOR.MY_STUDENTS.LABEL,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.MENTOR.MY_STUDENT_APPLICATIONS.LABEL,
    },
  ],
  [AccountRoles.ROLE_INSTITUTION_ADMIN]: [],
  [AccountRoles.ROLE_SYSTEM_ADMIN]: [
    {
      targetUrlString: '/all-students',
      icon: iconLibraryConfig.faUserGroup,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.ALL_STUDENTS.LABEL,
    },
    {
      targetUrlString: '/all-mentors',
      icon: iconLibraryConfig.faUserGroup,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.ALL_MENTORS.LABEL,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.ALL_APPLICATIONS.LABEL,
    },
    {
      targetUrlString: '/system',
      icon: iconLibraryConfig.faGears,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.SYSTEM.LABEL,
    },
  ],
};

/**
 * Defines the component's properties.
 */
interface PrivateLayoutProps {
  /**
   * The list of roles permitted to view this layout.
   */
  readonly allowedRoles: Array<AccountRoles>;
}

/**
 * Renders navigation links for authorised users. Users with different authorisation level might see different
 * navigation links. Unauthorised users are redirected to the root page.
 *
 * @param {PrivateLayoutProps} props
 * @return {JSX.Element}
 */
export const PrivateLayout = ({ allowedRoles }: PrivateLayoutProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authStatus, account, logOut } = useAuthContext();
  const { isNavbarOpen, toggleNavbar, handleOnFocus, handleOnBlur } = useSmallScreenNavbarDisplay();
  const isMobileView = useMobileView();

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

  const routes = (
    <div>
      <ul className={'lg:flex lg:items-center lg:gap-x-8'}>
        {accountRoleNavigationRoutes[account.role as AccountRoles].map((route: NavigationRouteItem) => (
          <li
            key={route.targetUrlString}
            className={'my-4'}
          >
            <NavigationRoute
              targetUrlString={route.targetUrlString}
              icon={route.icon}
              label={route.label}
            />
          </li>
        ))}
      </ul>
      <ul className={'justify-end lg:flex lg:items-center lg:gap-x-8'}>
        {sharedNavigationRoutes.map((route: NavigationRouteItem) => (
          <li
            key={route.targetUrlString}
            className={'my-4'}
          >
            <NavigationRoute
              targetUrlString={route.targetUrlString}
              icon={route.icon}
              label={route.label}
            />
          </li>
        ))}
        <li>
          <NavigationRoute
            targetUrlString={'/'}
            icon={iconLibraryConfig.faRightFromBracket}
            label={l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.LOG_OUT.LABEL}
            onNavigateClick={() => logOut()}
          />
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <NavigationBarWrapper>
        <div className={'w-1/3 flex-none'}>
          <NavigationRoute
            targetUrlString={'/dashboard'}
            icon={iconLibraryConfig.faGraduationCap}
            label={l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.DASHBOARD.LABEL}
          />
        </div>
        {isMobileView ? (
          <div
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className={joinTw(
              isNavbarOpen ? 'right-0' : '-right-full',
              'z-100 w-5/10 h-10/10 bg-primary fixed top-0 pl-20 pt-40 transition-all duration-500 ease-in-out',
            )}
          >
            {routes}
            <div
              onClick={() => toggleNavbar()}
              className={'top-15 absolute right-10 lg:hidden'}
            >
              <CoreIcon icon={iconLibraryConfig.faXMark} />
            </div>
          </div>
        ) : (
          <>{routes}</>
        )}
        <div
          onClick={() => toggleNavbar()}
          className={'top-15 absolute right-10 lg:hidden'}
        >
          <CoreIcon icon={iconLibraryConfig.faBars} />
        </div>
      </NavigationBarWrapper>
      <Outlet />
      <Footer />
    </>
  );
};
