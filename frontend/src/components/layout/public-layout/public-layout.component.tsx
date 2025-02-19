/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

/* component, style imports */
import { BaseNavbar } from '@components/base-styles';
import { NavigationRoute } from '../navigation-route';
import { PageFooter } from '../page-footer';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { localization as l } from '@constants';

/**
 * Renders the navigation routes for unauthorised users.
 *
 * @return {JSX.Element}
 */
export const PublicLayout = (): JSX.Element => {
  return (
    <>
      <BaseNavbar>
        <nav>
          <div>
            <FontAwesomeIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </div>
          <ul>
            <li>
              <NavigationRoute
                resource={'/contact'}
                icon={iconLibraryConfig.faPaperPlane}
                label={l.LAYOUT.PUBLIC_LAYOUT.ROUTES.CONTACT_US.LABEL}
              />
            </li>
          </ul>
        </nav>
      </BaseNavbar>
      <Outlet />
      <PageFooter />
    </>
  );
};
