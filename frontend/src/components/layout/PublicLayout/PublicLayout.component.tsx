import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseNavbar } from '@components/base-styles';
import NavbarLink from '../NavbarLink';
import Footer from '../PageBottom';
import { iconLibraryConfig } from '@configuration';

const PublicLayout = () => {
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
              <NavbarLink
                resource={'/contact'}
                icon={iconLibraryConfig.faPaperPlane}
                content={'Contact us'}
              />
            </li>
          </ul>
        </nav>
      </BaseNavbar>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
