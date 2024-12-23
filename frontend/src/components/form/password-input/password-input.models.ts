/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

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
