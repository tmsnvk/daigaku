/**
 * @prettier
 */

import { IconLookup } from '@fortawesome/fontawesome-svg-core';

import { theme } from '@theme/theme';
import { NavbarIcon, RouteLink } from './navigation-route.styles';

interface ComponentProps {
  readonly resource: string;
  readonly icon: IconLookup;
  readonly content: string;
  readonly handleLogOut?: () => void;
}

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
