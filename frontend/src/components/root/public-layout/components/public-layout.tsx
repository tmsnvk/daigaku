/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Outlet } from '@tanstack/react-router';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { Footer } from '../../common/components/footer.tsx';
import { NavigationBarWrapper } from '../../common/components/navigation-bar-wrapper.tsx';
import { NavigationRoute } from '../../common/components/navigation-route.tsx';

/* configuration, constants imports */
import { navigationRoutes } from '../constants.ts';

/* interface, type imports */
import { NavigationRouteItem } from '@daigaku/common-types';

interface PublicLayoutProps {
  /**
   *
   */
  readonly buildId: string;
}

/**
 * Renders navigation routes for unauthorized users.
 *
 * @return {JSX.Element}
 */
export const PublicLayout = ({ buildId }: PublicLayoutProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBarWrapper>
        <ul className={'flex w-[90%] justify-between'}>
          {navigationRoutes.map((route: NavigationRouteItem) => (
            <li
              className={joinTw('my-4', 'md:mx-4')}
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
      </NavigationBarWrapper>
      <Outlet />
      <Footer buildId={buildId} />
    </>
  );
};
