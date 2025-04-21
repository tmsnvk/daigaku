/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { useMobileView, useSmallScreenNavbarDisplay } from '@daigaku/hooks';

/* component imports */
import { CoreIcon } from '../core/core-icon.tsx';
import { LoadingModal } from '../notification';
import { Footer } from './footer.tsx';
import { NavigationBarWrapper } from './navigation-bar-wrapper.tsx';
import { NavigationRoute } from './navigation-route.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { NavigationRouteItem, UserLoginState, UserRoles } from '@daigaku/common-types';

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
export const accountRoleNavigationRoutes: { [key in UserRoles]: Array<NavigationRouteItem> } = {
  [UserRoles.ROLE_STUDENT]: [
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
  [UserRoles.ROLE_MENTOR]: [
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
  [UserRoles.ROLE_INSTITUTION_ADMIN]: [],
  [UserRoles.ROLE_SYSTEM_ADMIN]: [
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
  readonly allowedRoles: Array<UserRoles>;
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

    if (!allowedRoles.includes(account.role as UserRoles)) {
      const redirectPath = account ? '/unauthorised' : '/';

      navigate(redirectPath, { state: { from: location }, replace: true });
    }
  }, [account]);

  if (authStatus === UserLoginState.LOADING) {
    return (
      <LoadingModal
        isVisible={true}
        status={l.LAYOUT.PRIVATE_LAYOUT.NOTIFICATIONS.LOADING_TEXT}
      />
    );
  }

  const routes = (
    <div>
      <ul className={joinTw('lg:flex lg:items-center lg:gap-x-8')}>
        {accountRoleNavigationRoutes[account.role as UserRoles].map((route: NavigationRouteItem) => (
          <li
            key={route.targetUrlString}
            className={joinTw('my-4')}
          >
            <NavigationRoute
              targetUrlString={route.targetUrlString}
              icon={route.icon}
              label={route.label}
            />
          </li>
        ))}
      </ul>
      <ul className={joinTw('justify-end lg:flex lg:items-center lg:gap-x-8')}>
        {sharedNavigationRoutes.map((route: NavigationRouteItem) => (
          <li
            key={route.targetUrlString}
            className={joinTw('my-4')}
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
        <div className={joinTw('flex-none', 'w-1/3')}>
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
              'z-100 fixed top-0',
              'w-5/10 h-10/10',
              'pl-20 pt-40',
              'bg-primary',
              'transition-all duration-500 ease-in-out',
            )}
          >
            {routes}
            <div
              onClick={() => toggleNavbar()}
              className={joinTw('top-15 absolute right-10 lg:hidden')}
            >
              <CoreIcon icon={iconLibraryConfig.faXMark} />
            </div>
          </div>
        ) : (
          <>{routes}</>
        )}
        <div
          onClick={() => toggleNavbar()}
          className={joinTw('top-15 absolute right-10 lg:hidden')}
        >
          <CoreIcon icon={iconLibraryConfig.faBars} />
        </div>
      </NavigationBarWrapper>
      <Outlet />
      <Footer />
    </>
  );
};
