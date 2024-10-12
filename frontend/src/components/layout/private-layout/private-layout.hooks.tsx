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
 * The interface represents the return value properties of the {@link useSmallScreenNavbarDisplay} custom hook.
 *
 * @since 0.0.1
 */
export interface SmallScreenNavbarDisplay {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
  handleOnFocus: () => void;
  handleOnBlur: () => void;
}

/**
 * The custom hook toggles the visibility state of the navigation bar on small screens.
 *
 * @returns {SmallScreenNavbarDisplay} An object containing:
 * - `isNavbarOpen` A boolean indicating whether the navbar is currently open.
 * - `toggleNavbar` A function to toggle the navbar's open state.
 * - `handleOnBlur` A function to close the navbar when it loses focus.
 * - `handleOnFocus` A function to set the navbar to open when focused.
 *
 * @since 0.0.1
 */
export const useSmallScreenNavbarDisplay = (): SmallScreenNavbarDisplay => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const toggleNavbar = (): void => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleOnFocus = (): void => {
    setIsNavbarOpen(true);
  };

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
