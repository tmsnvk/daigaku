import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BaseNavbar } from '@components/base-styles';
import NavigationRoute from '../navigation-route';
import PageBottom from '../page-bottom';

import { iconLibraryConfig } from '@configuration';

const PublicLayout = () => {
  return (
    <>
      <BaseNavbar>
        <nav>
          <div>
            <FontAwesomeIcon
              icon={iconLibraryConfig.faGraduationCap}
            />
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

export default PublicLayout;
