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

/**
 * Defines the state and behavior for managing a small screen navbar display.
 */
export interface SmallScreenNavbarDisplay {
  /**
   * A boolean indicating whether the navbar is currently open.
   */
  readonly isNavbarOpen: boolean;

  /**
   * A function to toggle the navbar's open state.
   */
  toggleNavbar: () => void;

  /**
   * A function to open the navbar when it gains focus.
   */
  handleOnFocus: () => void;

  /**
   * A function to close the navbar when it loses focus.
   */
  handleOnBlur: () => void;
}

/**
 * Defines a navigation route.
 */
export interface NavbarRoute {
  /**
   * The URL associated with the navigation route.
   */
  readonly url: string;

  /**
   * The FontAwesome icon associated with the navigation route.
   */
  readonly icon: IconLookup;

  /**
   * The label displayed for the navigation route.
   */
  readonly label: string;
}
