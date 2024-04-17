import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AccountRoleE,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { useHandleSmallScreenMenuDisplay } from './PrivateLayout.hooks.tsx';
import { GlobalLoadingModal } from '@components/shared/notification';
import BaseNavbarStyle from '../BaseNavbarStyle';
import NavbarLink from '../NavbarLink';
import Footer from '../Footer';
import {
  SmallScreenMenuToggler,
  SmallScreenMenuWrapper,
} from './PrivateLayout.styles.ts';
import { iconLibraryConfig } from '@configuration';
import {
  NavbarContentT,
  navbarContent,
} from './PrivateLayout.utilities.ts';

type ComponentPropsT = {
  allowedRoles: AccountRoleE[];
}

const PrivateLayout = ({
  allowedRoles,
}: ComponentPropsT) => {
  const location = useLocation();
  const {
    authStatus,
    account,
    logOut,
  } = useAuth();
  const {
    ref,
    toggleMenu,
    isNavbarOpen,
    handleInsideClick,
    handleOutsideClick,
  } = useHandleSmallScreenMenuDisplay();

  if (authStatus === AuthStatusE.LOADING) {
    return <GlobalLoadingModal />;
  }

  if (!allowedRoles.includes(account.role as AccountRoleE)) {
    if (account) {
      return <Navigate to={'/unauthorised'} state={{ from: location }} replace />;
    }

    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      <BaseNavbarStyle>
        <nav>
          <div>
            <FontAwesomeIcon icon={iconLibraryConfig.faGraduationCap} />
            Daigaku
          </div>
          <SmallScreenMenuWrapper
            ref={ref}
            $isNavbarOpen={isNavbarOpen}
            onMouseDown={handleInsideClick}
            onMouseOut={handleOutsideClick}
            onKeyDown={handleOutsideClick}
          >
            <ul>
              <li>
                <NavbarLink
                  resource={'/dashboard'}
                  icon={iconLibraryConfig.faHouseUser}
                  content={'Dashboard'}
                />
              </li>
              {navbarContent[account.role as AccountRoleE].map((element: NavbarContentT) => {
                return (
                  <li key={element.url}>
                    <NavbarLink
                      resource={element.url}
                      icon={element.icon}
                      content={element.content}
                    />
                  </li>
                );
              })}
              <li>
                <NavbarLink
                  resource={'/account'}
                  icon={iconLibraryConfig.faUser}
                  content={'My Account'}
                />
              </li>
              <li>
                <NavbarLink
                  resource={'/'}
                  icon={iconLibraryConfig.faRightFromBracket}
                  content={'Log out'}
                  onClick={logOut}
                />
              </li>
            </ul>
            <SmallScreenMenuToggler onClick={toggleMenu}>
              <FontAwesomeIcon icon={iconLibraryConfig.faXMark} />
            </SmallScreenMenuToggler>
          </SmallScreenMenuWrapper>
          <SmallScreenMenuToggler onClick={toggleMenu}>
            <FontAwesomeIcon icon={iconLibraryConfig.faBars} />
          </SmallScreenMenuToggler>
        </nav>
      </BaseNavbarStyle>
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;
