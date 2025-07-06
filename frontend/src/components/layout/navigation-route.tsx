/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { Link } from '@tanstack/react-router';
import { JSX } from 'react';
import { joinTw } from 'utilities/join-tw';
import { CoreIcon } from '../core';

/* logic imports */

/* component imports */

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
 * @param {NavigationRouteProps} props
 * @return {JSX.Element}
 */
export const NavigationRoute = ({
  targetUrlString,
  icon,
  label,
  onNavigateClick,
}: NavigationRouteProps): JSX.Element => {
  return (
    <Link
      to={targetUrlString}
      onClick={onNavigateClick}
    >
      {({ isActive }) => (
        <div
          className={joinTw('flex items-center text-3xl font-semibold', isActive ? 'text-accent' : 'text-secondary')}
        >
          <CoreIcon
            icon={icon}
            className={joinTw(isActive ? 'text-accent' : 'text-secondary', 'mr-2')}
          />
          <span>{label}</span>
        </div>
      )}
    </Link>
  );
};
