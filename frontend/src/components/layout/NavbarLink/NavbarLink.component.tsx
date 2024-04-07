import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import theme from '@theme/theme.ts';
import {
  LinkContainer,
  NavbarIcon,
} from './NavbarLink.styles.ts';

type ComponentPropsT = {
  resource: string;
  icon: IconLookup,
  content: string;
  onClick?: () => void;
}

const NavbarLink = ({ resource, icon, content, onClick }: ComponentPropsT) => {
  return (
    <LinkContainer
      to={resource}
      style={({ isActive }) => ({
        color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark,
      })}
      onClick={onClick}
    >
      {({ isActive }) => (
        <>
          <NavbarIcon icon={icon} $isActive={isActive} />
          {content}
        </>
      )}
    </LinkContainer>
  );
};

export default NavbarLink;
