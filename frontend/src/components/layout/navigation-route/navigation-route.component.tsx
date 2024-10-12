/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/* component, style imports */
import { theme } from '@theme/theme';
import { NavbarIcon, RouteLink } from './navigation-route.styles';

/**
 * ===============
 * Component {@link NavigationRoute}
 * ===============
 */

/**
 * The interface represents the properties of the {@link NavigationRoute} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly resource: string;
  readonly icon: IconLookup;
  readonly label: string;
  readonly onLogOutClick?: () => void;
}

/**
 * The component renders a single navigation route that enables navigating in-between the application's pages.
 *
 * @param {ComponentProps} props
 * @param props.resource The url resource.
 * @param props.icon The FontAwesome icon accompanying the link title.
 * @param props.label The link's label.
 * @param props.onLogOutClick A callback method that handles logging the user out.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const NavigationRoute = ({ resource, icon, label, onLogOutClick }: ComponentProps): JSX.Element => {
  return (
    <RouteLink
      to={resource}
      style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
      onClick={onLogOutClick}
    >
      {({ isActive }) => (
        <>
          <NavbarIcon
            icon={icon}
            $isActive={isActive}
          />
          {label}
        </>
      )}
    </RouteLink>
  );
};
