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
import { TogglePassword } from './password-input.models';

/**
 * Manages password visibility in input fields.
 * Toggles the display of password input between plain text and obfuscated characters.
 *
 * @return {TogglePassword}
 */
export const useTogglePassword = (): TogglePassword => {
  const [isTextRevealed, setIsTextRevealed] = useState<boolean>(false);

  const toggleInputVisibility = (): void => {
    setIsTextRevealed(!isTextRevealed);
  };

  return {
    isTextRevealed,
    toggleInputVisibility,
  };
};
