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

/* interface, type, enum imports */
import { SmallScreenNavbarDisplay } from './private-layout.models';

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
