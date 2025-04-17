/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

/* component imports */
import { CoreIcon } from '../core/core-icon.tsx';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

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
export const NavigationRoute = ({
  targetUrlString,
  icon,
  label,
  onNavigateClick,
}: NavigationRouteProps): JSX.Element => {
  return (
    <NavLink
      to={targetUrlString}
      onClick={onNavigateClick}
      className={({ isActive }) => joinTw('text-3xl font-semibold', isActive ? 'text-accent' : 'text-secondary')}
    >
      {({ isActive }) => (
        <div className={'flex items-center'}>
          <CoreIcon
            icon={icon}
            className={joinTw(isActive ? 'text-accent' : 'text-secondary', 'mr-2')}
          />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
};
