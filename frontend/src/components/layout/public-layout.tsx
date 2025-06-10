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
import { TranslationKey, iconLibrary } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { NavigationRouteItem } from '@daigaku/common-types';

const navigationRoutes: Array<NavigationRouteItem> = [
  {
    targetUrlString: '/',
    icon: iconLibrary.faGraduationCap,
    label: 'Daigaku',
  },
  {
    targetUrlString: '/contact',
    icon: iconLibrary.faPaperPlane,
    label: TranslationKey.CONTACT_US,
  },
];

/**
 * Renders navigation routes for unauthorized users.
 *
 * @return {JSX.Element}
 */
export const PublicLayout = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBarWrapper>
        <ul className={joinTw('flex justify-between', 'w-[90%]')}>
          {navigationRoutes.map((route: NavigationRouteItem) => (
            <li
              key={route.targetUrlString}
              className={'my-4 md:mx-4'}
            >
              <NavigationRoute
                targetUrlString={route.targetUrlString}
                icon={route.icon}
                label={t(route.label)}
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
