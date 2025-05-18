/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { useMobileView, useSmallScreenNavbarDisplay } from '@daigaku/hooks';

/* component imports */
import { CoreLoadingNotification } from '@daigaku/components/core';
import { CoreIcon } from '../core/core-icon.tsx';
import { Footer } from './footer.tsx';
import { NavigationBarWrapper } from './navigation-bar-wrapper.tsx';
import { NavigationRoute } from './navigation-route.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { NavigationRouteItem, UserLoginState, UserRole } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface PrivateLayoutProps {
  /**
   * The list of roles permitted to view this layout.
   */
  readonly allowedRoles: Array<UserRole>;
}

/**
 * Defines shared navigation routes accessible to all authenticated users.
 */

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
  const { t } = useTranslation();

  const { authStatus, account, logOut } = useAuthContext();

  const { isNavbarOpen, toggleNavbar, handleOnFocus, handleOnBlur } = useSmallScreenNavbarDisplay();
  const isMobileView = useMobileView();

  useEffect(() => {
    if (account.role === null) {
      return;
    }

    if (!allowedRoles.includes(account.role as UserRole)) {
      const redirectPath = account ? '/unauthorised' : '/';

      navigate(redirectPath, { state: { from: location }, replace: true });
    }
  }, [account]);

  if (authStatus === UserLoginState.LOADING) {
    return <CoreLoadingNotification intent={'light'} />;
  }

  const sharedNavigationRoutes: Array<NavigationRouteItem> = [
    {
      targetUrlString: '/account',
      icon: iconLibraryConfig.faUser,
      label: t('myAccount'),
    },
    {
      targetUrlString: '/messages',
      icon: iconLibraryConfig.faEnvelope,
      label: t('messages'),
    },
    {
      targetUrlString: '/feedback',
      icon: iconLibraryConfig.faGears,
      label: t('feedback'),
    },
  ];

  const accountRoleNavigationRoutes: { [key in UserRole]: Array<NavigationRouteItem> } = {
    [UserRole.ROLE_STUDENT]: [
      {
        targetUrlString: '/new-application',
        icon: iconLibraryConfig.faFileCirclePlus,
        label: t('newApplication'),
      },
      {
        targetUrlString: '/applications',
        icon: iconLibraryConfig.faScroll,
        label: t('myApplications'),
      },
    ],
    [UserRole.ROLE_MENTOR]: [
      {
        targetUrlString: '/my-students',
        icon: iconLibraryConfig.faUserGroup,
        label: t('myStudents'),
      },
      {
        targetUrlString: '/applications',
        icon: iconLibraryConfig.faScroll,
        label: t('myStudentsApplications'),
      },
    ],
    [UserRole.ROLE_INSTITUTION_ADMIN]: [],
    [UserRole.ROLE_SYSTEM_ADMIN]: [
      {
        targetUrlString: '/all-students',
        icon: iconLibraryConfig.faUserGroup,
        label: t('allStudents'),
      },
      {
        targetUrlString: '/all-mentors',
        icon: iconLibraryConfig.faUserGroup,
        label: t('allMentors'),
      },
      {
        targetUrlString: '/applications',
        icon: iconLibraryConfig.faScroll,
        label: t('allApplications'),
      },
      {
        targetUrlString: '/system',
        icon: iconLibraryConfig.faGears,
        label: t('system'),
      },
    ],
  };

  const routes = (
    <div>
      <ul className={'lg:flex lg:items-center lg:gap-x-8'}>
        {accountRoleNavigationRoutes[account.role as UserRole].map((r: NavigationRouteItem) => (
          <li
            key={r.targetUrlString}
            className={'my-4'}
          >
            <NavigationRoute
              targetUrlString={r.targetUrlString}
              icon={r.icon}
              label={r.label}
            />
          </li>
        ))}
      </ul>
      <ul className={'justify-end lg:flex lg:items-center lg:gap-x-8'}>
        {sharedNavigationRoutes.map((r: NavigationRouteItem) => (
          <li
            key={r.targetUrlString}
            className={'my-4'}
          >
            <NavigationRoute
              targetUrlString={r.targetUrlString}
              icon={r.icon}
              label={r.label}
            />
          </li>
        ))}
        <li>
          <NavigationRoute
            targetUrlString={'/'}
            icon={iconLibraryConfig.faRightFromBracket}
            label={t('logOut')}
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
            label={t('dashboard')}
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
