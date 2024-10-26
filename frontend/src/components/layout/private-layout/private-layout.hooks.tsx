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
import { useState } from 'react';

/**
 * ===============
 * Custom Hook {@link useSmallScreenNavbarDisplay}
 * ===============
 */

/**
 * Defines the return value properties of the {@link useSmallScreenNavbarDisplay} custom hook.
 *
 * @since 0.0.1
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
 * Toggles the visibility state of the navigation bar on small screens.
 *
 * @return {SmallScreenNavbarDisplay}
 *
 * @since 0.0.1
 */
export const useSmallScreenNavbarDisplay = (): SmallScreenNavbarDisplay => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const toggleNavbar = (): void => {
    // Toggles the open state of the navbar.
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleOnFocus = (): void => {
    // Sets the navbar to open when focused.
    setIsNavbarOpen(true);
  };

  const handleOnBlur = (): void => {
    // Closes the navbar when it loses focus.
    setIsNavbarOpen(false);
  };

  return {
    isNavbarOpen,
    toggleNavbar,
    handleOnFocus,
    handleOnBlur,
  };
};
