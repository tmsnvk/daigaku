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
 * Toggles the password visibility in input fields between plain text and obfuscated characters.
 *
 * @return {TogglePassword}
 */
export const useTogglePassword = (): TogglePassword => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  const toggleInputVisibility = (): void => {
    setIsPasswordRevealed(!isPasswordRevealed);
  };

  return {
    isPasswordRevealed,
    toggleInputVisibility,
  };
};
