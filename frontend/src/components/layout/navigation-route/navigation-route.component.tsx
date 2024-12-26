/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { JSX } from 'react';

/* component, style imports */
import { theme } from '@theme/theme';
import { NavbarIcon, RouteLink } from './navigation-route.styles';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The URL resource for the navigation link.
   */
  readonly resource: string;

  /**
   * The FontAwesome icon accompanying the link's label.
   */
  readonly icon: IconLookup;

  /**
   * The link's label.
   */
  readonly label: string;

  /**
   * An optional callback method that handles the navigation route's onClick action.
   */
  readonly onNavigateClick?: () => void;
}

/**
 * Renders a navigation route component that enables navigating in-between the application's pages.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const NavigationRoute = ({ resource, icon, label, onNavigateClick }: ComponentProps): JSX.Element => {
  return (
    <RouteLink
      to={resource}
      style={({ isActive }) => ({ color: isActive ? theme.color.tertiaryLight : theme.color.primaryDark })}
      onClick={onNavigateClick}
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
