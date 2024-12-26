/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the properties for managing password visibility in input fields.
 */
export interface TogglePassword {
  /**
   * Indicates whether the password is currently visible.
   */
  isPasswordRevealed: boolean;

  /**
   * Toggles the visibility of the password text.
   */
  toggleInputVisibility: () => void;
}
