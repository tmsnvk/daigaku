/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router-dom';

/* component, style imports */
import { BaseNavbar } from '@components/base-styles';
import { NavigationRoute } from '../navigation-route';
import { PageFooter } from '../page-footer';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { constants } from './public-layout.constants';

/**
 * ===============
 * Component {@link PublicLayout}
 * ===============
 */

/**
 * @component
 * @description
 * The layout component renders navigation and content for unauthorised users.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
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
                label={constants.routes.contactUs.LABEL}
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
