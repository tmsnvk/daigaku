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
import { CoreIcon, CorePageLoader } from '@daigaku/components/common/core';
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
    return <CorePageLoader />;
  }

  const role = state.account?.role as UserRole | undefined;
  const roleRoutes = role ? (accountRoleNavigationRoutes[role] ?? []) : [];

  const routes = (
    <div>
      <ul className={'lg:flex lg:items-center lg:gap-x-8'}>
        {roleRoutes.map((route: NavigationRouteItem) => (
          <li
            className={'my-4'}
            key={route.targetUrlString}
          >
            <NavigationRoute
              icon={route.icon}
              label={t(route.label)}
              targetUrlString={route.targetUrlString}
            />
          </li>
        ))}
      </ul>
      <ul className={joinTw('justify-end', 'lg:flex lg:items-center lg:gap-x-8')}>
        {sharedNavigationRoutes.map((r: NavigationRouteItem) => (
          <li
            className={'my-4'}
            key={r.targetUrlString}
          >
            <NavigationRoute
              icon={r.icon}
              label={t(r.label)}
              targetUrlString={r.targetUrlString}
            />
          </li>
        ))}
        <li>
          <NavigationRoute
            icon={iconLibrary.faRightFromBracket}
            label={t('app.layout.navigation.shared.logOut')}
            targetUrlString={'/'}
            onNavigateClick={() => logOut()}
          />
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <NavigationBarWrapper>
        <section className={'w-1/3 flex-none'}>
          <NavigationRoute
            icon={iconLibrary.faGraduationCap}
            label={t('app.layout.navigation.shared.dashboard')}
            targetUrlString={'/dashboard'}
          />
        </section>
        <section>
          <div className={joinTw('hidden', 'lg:block')}>{routes}</div>
          <div
            className={joinTw('top-15 absolute right-10', 'lg:hidden')}
            onClick={openSmallScreenMenu}
          >
            <CoreIcon icon={iconLibrary.faBars} />
          </div>
        </section>
        {smallScreenMenuState !== 'closed' && (
          <section
            className={joinTw(
              'z-100 bg-primary fixed right-0 top-0 h-screen w-screen pl-20 pt-40 transition-transform duration-500',
              'sm:w-4/10 lg:hidden',
              smallScreenMenuState === 'open' ? 'translate-x-0' : 'translate-x-full',
            )}
            onClick={closeSmallScreenMenu}
          >
            {routes}
            <div
              className={joinTw('top-15 absolute right-10', 'lg:hidden')}
              onClick={closeSmallScreenMenu}
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
