/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/**
 * Defines the state and behavior for managing a small screen navbar display.
 */
interface SmallScreenNavbarDisplay {
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
 * Toggles the visibility state of the navigation bar on small screens.
 *
 * @return {SmallScreenNavbarDisplay}
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
