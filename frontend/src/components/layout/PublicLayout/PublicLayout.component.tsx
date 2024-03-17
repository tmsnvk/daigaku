import {
  Link,
  Outlet,
} from 'react-router-dom';
import { GeneralIcon } from '@components/shared/icon-styles';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import Footer from '../Footer';
import { iconLibraryConfig } from '@configuration';

const PublicLayout = () => {
  return (
    <>
      <DefaultNavbarStyles>
        <nav>
          <Link to={'/'}>
            <GeneralIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </Link>
          <ul>
            <li>
              <Link to={'/contact'}>
                <GeneralIcon icon={iconLibraryConfig.faPaperPlane} />
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </DefaultNavbarStyles>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
