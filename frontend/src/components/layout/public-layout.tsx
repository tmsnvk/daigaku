/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/* component, style imports */
import { Footer } from '../footer';
import { NavigationRoute } from '../navigation-route';
import { NavigationBarWrapper } from '../navigation-bar-wrapper.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { localization as l } from '@constants';

const navigationRoutes: { targetUrlString: string; icon: IconLookup; label: string }[] = [
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
        <ul className={'flex w-[90%] justify-between'}>
          {navigationRoutes.map((route) => (
            <li
              key={route.targetUrlString}
              className={'my-4 md:mx-4'}
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
