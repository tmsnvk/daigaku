import { IconLookup } from '@fortawesome/fontawesome-svg-core';

import theme from '@theme/theme.ts';
import {
  NavbarIcon,
  RouteLink,
} from './NavigationRoute.styles.ts';

type ComponentPropsT = {
  resource: string;
  icon: IconLookup,
  content: string;
  handleLogOut?: () => void;
}

const NavigationRoute = ({
  resource,
  icon,
  content,
  handleLogOut,
}: ComponentPropsT) => {
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

export default NavigationRoute;
