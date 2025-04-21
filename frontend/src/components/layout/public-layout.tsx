/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

/* component imports */
import { Footer } from './footer.tsx';
import { NavigationRoute } from './navigation-route.tsx';
import { NavigationBarWrapper } from './navigation-bar-wrapper.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { NavigationRouteItem } from '@daigaku/common-types';

const navigationRoutes: NavigationRouteItem[] = [
  {
    targetUrlString: '/',
    icon: iconLibraryConfig.faGraduationCap,
    label: 'Daigaku',
  },
  {
    targetUrlString: '/contact',
    icon: iconLibraryConfig.faPaperPlane,
    label: l.LAYOUT.PUBLIC_LAYOUT.ROUTES.CONTACT_US.LABEL,
  },
];

/**
 * Renders navigation routes for unauthorised users.
 *
 * @return {JSX.Element}
 */
export const PublicLayout = (): JSX.Element => {
  return (
    <>
      <NavigationBarWrapper>
        <ul className={joinTw('flex justify-between', 'w-[90%]')}>
          {navigationRoutes.map((route) => (
            <li
              key={route.targetUrlString}
              className={joinTw('my-4 md:mx-4')}
            >
              <NavigationRoute
                targetUrlString={route.targetUrlString}
                icon={route.icon}
                label={route.label}
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
