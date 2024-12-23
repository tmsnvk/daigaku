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
 * Defines the return value properties of the {@link useSmallScreenNavbarDisplay} custom hook.
 */
export interface SmallScreenNavbarDisplay {
  /**
   * A boolean indicating whether the navbar is currently open.
   */
  isNavbarOpen: boolean;

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
 * Defines a navigation route in the application.
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
