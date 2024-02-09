import {
  Link,
  Outlet,
} from 'react-router-dom';
import { LoadingSpinnerIcon } from '@components/shared/icon-styles';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import { iconLibraryConfig } from '@configuration';

const NoAuthNavbar = () => {
  return (
    <>
      <DefaultNavbarStyles>
        <nav>
          <Link to={'/'}>
            <LoadingSpinnerIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </Link>
          <ul>
            <li>
              <Link to={'/contact'}>Contact us</Link>
            </li>
          </ul>
        </nav>
      </DefaultNavbarStyles>
      <Outlet/>
    </>
  );
};

export default NoAuthNavbar;
