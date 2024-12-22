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
 * Defines the properties returned by the {@link useTogglePassword} custom hook.
 */
export interface TogglePassword {
  /**
   * Indicates if the password is currently visible.
   */
  isTextRevealed: boolean;

  /**
   * Toggles the visibility of the password text.
   */
  toggleInputVisibility: () => void;
}

/**
 * Manages password visibility in input fields.
 * Toggles the display of password input between plain text and obfuscated characters.
 *
 * @return {TogglePassword}
 */
export const useTogglePassword = (): TogglePassword => {
  // State to determine if the password text is currently revealed.
  const [isTextRevealed, setIsTextRevealed] = useState<boolean>(false);

  // Toggles the state of password visibility.
  const toggleInputVisibility = (): void => {
    setIsTextRevealed(!isTextRevealed);
  };

  return {
    isTextRevealed,
    toggleInputVisibility,
  };
};
