/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Outlet } from '@tanstack/react-router';
import { JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CoreIcon, CoreLoadingNotification } from '@daigaku/components/common/core';
import { Footer } from '../../common/components/footer.tsx';
import { NavigationBarWrapper } from '../../common/components/navigation-bar-wrapper.tsx';
import { NavigationRoute } from '../../common/components/navigation-route.tsx';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';
import { accountRoleNavigationRoutes, sharedNavigationRoutes } from '../constants.ts';

/* interface, type imports */
import { NavigationRouteItem, UserLoginStates, UserRole } from '@daigaku/common-types';

/**
 * Defines the possible states of the small screen mobile navigation menu.
 */
type SmallScreenMenuState = 'closed' | 'opening' | 'open' | 'closing';

/**
 * Defines the component's properties.
 */
interface PrivateLayoutProps {
  /**
   *
   */
  readonly buildId: string;
}

/**
 * Renders navigation links for authorized users. Users with different authorization levels might see different
 * navigation links. Unauthorized users are redirected to the root page.
 *
 * @param {PrivateLayoutProps} props
 * @return {JSX.Element}
 */
export const PrivateLayout = ({ buildId }: PrivateLayoutProps): JSX.Element => {
  const { t } = useTranslation();

  const { state, logOut } = useAuthenticationProvider();

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
  }, [smallScreenMenuState]);

  if (state.authenticationStatus === UserLoginStates.LOADING) {
    return <CoreLoadingNotification intent={'light'} />;
  }

  const role = state.account?.role as UserRole | undefined;
  const roleRoutes = role ? (accountRoleNavigationRoutes[role] ?? []) : [];

  const routes = (
    <div>
      <ul className={'lg:flex lg:items-center lg:gap-x-8'}>
        {roleRoutes.map((r: NavigationRouteItem) => (
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
              <CoreIcon icon={iconLibrary.faXmark} />
            </div>
          </section>
        )}
      </NavigationBarWrapper>
      <Outlet />
      <Footer buildId={buildId} />
    </>
  );
};
