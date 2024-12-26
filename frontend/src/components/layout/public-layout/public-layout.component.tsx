/**
 * @prettier
 */

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
import { constants } from './public-layout.constants';

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
                label={constants.ui.contactUs.LABEL}
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
