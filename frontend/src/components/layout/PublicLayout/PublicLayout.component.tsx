import { Outlet } from 'react-router-dom';
import BaseNavbarStyle from '../BaseNavbarStyle';
import NavbarLink from '../NavbarLink';
import Footer from '../Footer';
import { iconLibraryConfig } from '@configuration';
import { NavbarIcon } from '@components/layout/NavbarLink/NavbarLink.styles.ts';

const PublicLayout = () => {
  return (
    <>
      <BaseNavbarStyle>
        <nav>
          <div>
            <NavbarIcon icon={iconLibraryConfig.faGraduationCap} />
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
