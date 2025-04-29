/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* component imports */
import { Footer } from './footer.tsx';
import { NavigationBarWrapper } from './navigation-bar-wrapper.tsx';
import { NavigationRoute } from './navigation-route.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { NavigationRouteItem } from '@daigaku/common-types';

/**
 * Renders navigation routes for unauthorised users.
 *
 * @return {JSX.Element}
 */
export const PublicLayout = (): JSX.Element => {
  const { t } = useTranslation();

  const navigationRoutes: NavigationRouteItem[] = [
    {
      targetUrlString: '/',
      icon: iconLibraryConfig.faGraduationCap,
      label: 'Daigaku',
    },
    {
      targetUrlString: '/contact',
      icon: iconLibraryConfig.faPaperPlane,
      label: t('contactUs'),
    },
  ];

  return (
    <>
      <NavigationBarWrapper>
        <ul className={joinTw('flex justify-between', 'w-[90%]')}>
          {navigationRoutes.map((r: NavigationRouteItem) => (
            <li
              key={r.targetUrlString}
              className={joinTw('my-4 md:mx-4')}
            >
              <NavigationRoute
                targetUrlString={r.targetUrlString}
                icon={r.icon}
                label={r.label}
              />
            </li>
          ))}
        </ul>
      </NavigationBarWrapper>
      <Outlet />
      <Footer />
    </>
  );
};
