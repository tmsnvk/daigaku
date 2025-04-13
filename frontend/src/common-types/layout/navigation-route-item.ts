/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/**
 * Defines a navigation route object's properties.
 */
export interface NavigationRoute {
  /**
   * The route's target url.
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
