/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';

/* component imports */
import { CoreLoadingNotification } from '@daigaku/components/core';
import { CoreIcon } from '../core/core-icon.tsx';
import { Footer } from './footer.tsx';
import { NavigationBarWrapper } from './navigation-bar-wrapper.tsx';
import { NavigationRoute } from './navigation-route.tsx';

/* configuration, utilities, constants imports */
import { TranslationKey, iconLibrary } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { NavigationRouteItem, UserLoginStates, UserRole, UserRoles } from '@daigaku/common-types';

const sharedNavigationRoutes: Array<NavigationRouteItem> = [
  {
    targetUrlString: '/account',
    icon: iconLibrary.faUser,
    label: TranslationKey.MY_ACCOUNT,
  },
  {
    targetUrlString: '/messages',
    icon: iconLibrary.faEnvelope,
    label: TranslationKey.MESSAGES,
  },
  {
    targetUrlString: '/feedback',
    icon: iconLibrary.faGears,
    label: TranslationKey.FEEDBACK,
  },
];

const accountRoleNavigationRoutes: { [key in UserRole]: Array<NavigationRouteItem> } = {
  [UserRoles.ROLE_STUDENT]: [
    {
      targetUrlString: '/new-application',
      icon: iconLibrary.faFileCirclePlus,
      label: TranslationKey.NEW_APPLICATION,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: TranslationKey.MY_APPLICATION,
    },
  ],
  [UserRoles.ROLE_MENTOR]: [
    {
      targetUrlString: '/my-students',
      icon: iconLibrary.faUserGroup,
      label: TranslationKey.MY_STUDENTS,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: TranslationKey.MY_STUDENT_APPLICATIONS,
    },
  ],
  [UserRoles.ROLE_INSTITUTION_ADMIN]: [],
  [UserRoles.ROLE_SYSTEM_ADMIN]: [
    {
      targetUrlString: '/all-students',
      icon: iconLibrary.faUserGroup,
      label: TranslationKey.ALL_STUDENTS,
    },
    {
      targetUrlString: '/all-mentors',
      icon: iconLibrary.faUserGroup,
      label: TranslationKey.ALL_MENTORS,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: TranslationKey.ALL_APPLICATIONS,
    },
    {
      targetUrlString: '/system',
      icon: iconLibrary.faGears,
      label: TranslationKey.SYSTEM,
    },
  ],
};

/**
 * Defines the possible states of the small screen mobile navigation menu.
 */
type SmallScreenMenuState = 'closed' | 'opening' | 'open' | 'closing';

/**
 * Defines the component's properties.
 */
interface PrivateLayoutProps {
  /**
   * The list of roles permitted viewing this layout.
   */
  readonly allowedRoles: Array<UserRole>;
}

/**
 * Renders navigation links for authorized users. Users with different authorization levels might see different
 * navigation links. Unauthorized users are redirected to the root page.
 *
 * @param {PrivateLayoutProps} props
 * @return {JSX.Element}
 */
export const PrivateLayout = ({ allowedRoles }: PrivateLayoutProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { authStatus, account, logOut } = useAuthContext();

  const [smallScreenMenuState, setSmallScreenMenuState] = useState<SmallScreenMenuState>('closed');

  const openSmallScreenMenu = () => {
    setSmallScreenMenuState('opening');
    document.body.style.overflow = 'hidden';
  };

  const closeSmallScreenMenu = () => {
    setSmallScreenMenuState('closing');
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (smallScreenMenuState === 'opening') {
      const timeout = setTimeout(() => {
        setSmallScreenMenuState('open');
      }, 100);

      return () => clearTimeout(timeout);
    }

    if (smallScreenMenuState === 'closing') {
      const timeout = setTimeout(() => {
        setSmallScreenMenuState('closed');
      }, 300);

      return () => clearTimeout(timeout);
    }

    if (smallScreenMenuState === 'closed') {
      closeSmallScreenMenu();
    }
  }, [smallScreenMenuState]);

  useEffect(() => {
    if (account.role === null) {
      return;
    }

    if (!account || !allowedRoles.includes(account.role as UserRole)) {
      const redirectPath = account ? '/unauthorised' : '/';

      navigate(redirectPath, { state: { from: location }, replace: true });
    }
  }, [account]);

  if (authStatus === UserLoginStates.LOADING) {
    return <CoreLoadingNotification intent={'light'} />;
  }

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
              label={t(r.label)}
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
              label={t(r.label)}
            />
          </li>
        ))}
        <li>
          <NavigationRoute
            targetUrlString={'/'}
            icon={iconLibrary.faRightFromBracket}
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
        <section className={joinTw('flex-none', 'w-1/3')}>
          <NavigationRoute
            targetUrlString={'/dashboard'}
            icon={iconLibrary.faGraduationCap}
            label={t('dashboard')}
          />
        </section>
        <section>
          <div className={'hidden lg:block'}>{routes}</div>
          <div
            onClick={openSmallScreenMenu}
            className={'top-15 absolute right-10 lg:hidden'}
          >
            <CoreIcon icon={iconLibrary.faBars} />
          </div>
        </section>
        {smallScreenMenuState !== 'closed' && (
          <section
            onClick={closeSmallScreenMenu}
            className={joinTw(
              'z-100 fixed right-0 top-0 lg:hidden',
              'sm:w-4/10 h-screen w-screen',
              'pl-20 pt-40',
              'bg-primary',
              'transition-transform duration-500',
              smallScreenMenuState === 'open' ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            {routes}
            <div
              onClick={closeSmallScreenMenu}
              className={'top-15 absolute right-10 lg:hidden'}
            >
              <CoreIcon icon={iconLibrary.faXMark} />
            </div>
          </section>
        )}
      </NavigationBarWrapper>
      <Outlet />
      <Footer />
    </>
  );
};
