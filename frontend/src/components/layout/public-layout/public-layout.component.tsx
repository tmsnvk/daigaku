/**
 * @prettier
 */

/* external imports */
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* component, style imports */
import { BaseNavbar } from '@components/base-styles';
import { NavigationRoute } from '../navigation-route';
import { PageBottom } from '../page-bottom';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/*
 * component - TODO - add functionality description
 */
export const PublicLayout = () => {
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
                content={'Contact us'}
              />
            </li>
          </ul>
        </nav>
      </BaseNavbar>
      <Outlet />
      <PageBottom />
    </>
  );
};
