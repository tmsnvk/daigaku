/**
 * @prettier
 */

/* external imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/* component, style imports */
import { theme } from '@theme/theme';
import { NavbarIcon, RouteLink } from './navigation-route.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly resource: string;
  readonly icon: IconLookup;
  readonly content: string;
  readonly handleLogOut?: () => void;
}

/*
 * component - TODO - add functionality description
 */
export const NavigationRoute = ({ resource, icon, content, handleLogOut }: ComponentProps) => {
  return (
    <RouteLink
      to={resource}
      style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
      onClick={handleLogOut}
    >
      {({ isActive }) => (
        <>
          <NavbarIcon
            icon={icon}
            $isActive={isActive}
          />
          {content}
        </>
      )}
    </RouteLink>
  );
};
