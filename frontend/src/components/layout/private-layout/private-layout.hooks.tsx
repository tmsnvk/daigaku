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
  // State to track whether the navbar is open.
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  // Toggles the open state of the navbar.
  const toggleNavbar = (): void => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Sets the navbar to open when focused.
  const handleOnFocus = (): void => {
    setIsNavbarOpen(true);
  };

  // Closes the navbar when it loses focus.
  const handleOnBlur = (): void => {
    setIsNavbarOpen(false);
  };

  return {
    isNavbarOpen,
    toggleNavbar,
    handleOnFocus,
    handleOnBlur,
  };
};
