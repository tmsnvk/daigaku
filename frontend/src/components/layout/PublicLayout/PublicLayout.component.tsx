import {
  NavLink,
  Outlet,
} from 'react-router-dom';
import { GeneralIcon } from '@components/shared/icon-styles';
import DefaultNavbarStyles from '../DefaultNavbarStyles';
import Footer from '../Footer';
import { iconLibraryConfig } from '@configuration';
import theme from '@theme/theme.ts';

const PublicLayout = () => {
  return (
    <>
      <DefaultNavbarStyles>
        <nav>
          <div>
            <GeneralIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </div>
          <ul>
            <li>
              <NavLink
                to={'/contact'}
                style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
              >
                <GeneralIcon icon={iconLibraryConfig.faPaperPlane} />
                Contact us
              </NavLink>
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
