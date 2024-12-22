/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

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
 * Toggles the visibility state of the navigation bar on small screens.
 *
 * @return {SmallScreenNavbarDisplay}
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
