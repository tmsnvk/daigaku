import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseNavbarStyle from '../BaseNavbarStyle';
import NavbarLink from '../NavbarLink';
import Footer from '../Footer';
import { iconLibraryConfig } from '@configuration';

const PublicLayout = () => {
  return (
    <>
      <BaseNavbarStyle>
        <nav>
          <div>
            <FontAwesomeIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </div>
          <ul>
            <li>
              <NavbarLink
                resource={'/contact'}
                icon={iconLibraryConfig.faPaperPlane}
                content={'Contact us'}
              />
            </li>
          </ul>
        </nav>
      </BaseNavbarStyle>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
