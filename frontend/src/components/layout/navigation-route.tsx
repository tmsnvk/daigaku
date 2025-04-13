/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

/* component, style imports */
import { CoreIcon } from '../../core-icon';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

/**
 * Defines the component's properties.
 */
interface NavigationRouteProps {
  /**
   * The URL targetUrlString for the navigation link.
   */
  readonly targetUrlString: string;

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
  onNavigateClick?: () => void;
}

/**
 * Renders a navigation route component that enables navigating in-between the application's pages.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const NavigationRoute = ({ targetUrlString, icon, label, onNavigateClick }: NavigationRouteProps): JSX.Element => {
  return (
    <NavLink
      to={targetUrlString}
      style={({ isActive }) => ({ color: isActive ? 'text-accent' : 'text-secondary' })}
      onClick={onNavigateClick}
      className={'e text-3xl font-semibold'}
    >
      {({ isActive }) => (
        <div>
          <CoreIcon
            icon={icon}
            className={joinTw(isActive ? 'text-accent' : 'text-secondary')}
          />
          {label}
        </div>
      )}
    </NavLink>
  );
};
