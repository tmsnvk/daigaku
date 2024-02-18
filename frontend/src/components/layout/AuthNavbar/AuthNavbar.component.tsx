import {
  Link,
  Outlet,
} from 'react-router-dom';
import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { GeneralIcon } from '@components/shared/icon-styles';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import { iconLibraryConfig } from '@configuration';
import {
  NavbarContentT,
  navbarContent,
} from './AuthNavbar.utilities.ts';

const AuthNavbar = () => {
  const { account } = useAuth();

  return (
    <>
      <DefaultNavbarStyles>
        <nav>
          <Link to={'/dashboard'}>
            <GeneralIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </Link>
          <ul>
            {navbarContent[account.accountRole as AccountRoleE].map((element: NavbarContentT) => {
              return (
                <li key={element.url}>
                  <Link to={element.url}>
                    <GeneralIcon icon={element.icon} />
                    {element.content}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </DefaultNavbarStyles>
      <Outlet />
    </>
  );
};

export default AuthNavbar;
