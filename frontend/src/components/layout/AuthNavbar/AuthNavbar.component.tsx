import { Outlet } from 'react-router-dom';
import { GeneralIcon } from '@components/shared/icon-styles';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import { iconLibraryConfig } from '@configuration';
import { AccountRoleE } from '@context/AuthContext.tsx';
import { navbarContent} from './AuthNavbar.utilities.ts';

const AuthNavbar = () => {
  return (
    <>
      <DefaultNavbarStyles>

      </DefaultNavbarStyles>
      <Outlet />
    </>
  );
};

export default AuthNavbar;
