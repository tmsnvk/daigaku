import { Outlet } from 'react-router-dom';
import { NavbarLink } from '@components/shared/navigation';
import { GeneralIcon } from '@components/shared/icon-styles';
import BaseNavbarStyle from '../BaseNavbarStyle';
import Footer from '../Footer';
import { iconLibraryConfig } from '@configuration';

const PublicLayout = () => {
  return (
    <>
      <BaseNavbarStyle>
        <nav>
          <div>
            <GeneralIcon icon={iconLibraryConfig.faGraduationCap} />
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
