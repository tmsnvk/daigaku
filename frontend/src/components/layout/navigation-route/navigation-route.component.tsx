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
 * Defines the properties of the {@link NavigationRoute} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The URL resource for the navigation link.
   */
  readonly resource: string;

  /**
   * The FontAwesome icon accompanying the link title.
   */
  readonly icon: IconLookup;

  /**
   * The link's label.
   */
  readonly label: string;

  /**
   * Callback method that handles logging the user out.
   */
  readonly onLogOutClick?: () => void;
}

/**
 * Renders a navigation route component that enables navigating in-between the application's pages.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
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
