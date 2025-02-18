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
