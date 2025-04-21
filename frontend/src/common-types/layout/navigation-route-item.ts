/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/**
 * Defines a navigation route object's properties.
 */
export interface NavigationRouteItem {
  /**
   * The route's target url string.
   */
  targetUrlString: string;

  /**
   * The route's icon.
   */
  icon: IconLookup;

  /**
   * The route's name.
   */
  label: string;
}
