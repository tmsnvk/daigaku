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
 * Custom Hook {@link useTogglePassword}
 * ===============
 */

/* interfaces, types, enums */
export interface TogglePassword {
  isTextRevealed: boolean;
  toggleTextVisibility: () => void;
}

/**
 * @description
 * The custom hook manages the visibility of text within a password input field.
 * The hook toggles whether the entered text in a password field is shown as plain text or obfuscated characters.
 *
 * @returns {TogglePassword} An object containing:
 * - `isTextRevealed` A boolean indicating if the password is currently visible.
 * - `toggleTextVisibility` A function to toggle the visibility state of the password.
 *
 * @since 0.0.1
 */
export const useTogglePassword = (): TogglePassword => {
  const [isTextRevealed, setIsTextRevealed] = useState<boolean>(false);

  const toggleTextVisibility = (): void => {
    setIsTextRevealed(!isTextRevealed);
  };

  return {
    isTextRevealed,
    toggleTextVisibility,
  };
};
