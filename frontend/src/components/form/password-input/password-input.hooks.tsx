/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { useState } from 'react';

/**
 * ===============
 * Custom Hook {@link useTogglePassword}
 * ===============
 */

/**
 * Defines the properties return by the {@link useTogglePassword} custom hook.
 *
 * @since 0.0.1
 */
export interface TogglePassword {
  /**
   * Indicates if the password is currently visible.
   */
  isTextRevealed: boolean;

  /**
   * Toggles the visibility of the password text.
   */
  toggleTextVisibility: () => void;
}

/**
 * Manages password visibility in input fields.
 * Toggles the display of password text between plain text and obfuscated characters.
 *
 * @return {TogglePassword}
 *
 * @since 0.0.1
 */
export const useTogglePassword = (): TogglePassword => {
  // State to determine if the password text is currently revealed.
  const [isTextRevealed, setIsTextRevealed] = useState<boolean>(false);

  // Toggles the current state of password visibility.
  const toggleTextVisibility = (): void => {
    setIsTextRevealed(!isTextRevealed);
  };

  return {
    isTextRevealed,
    toggleTextVisibility,
  };
};
