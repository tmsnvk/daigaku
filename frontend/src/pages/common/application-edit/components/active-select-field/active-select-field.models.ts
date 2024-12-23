/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the structure for the field update function returned by {@link useOnFieldUpdate}.
 */
export interface FieldUpdate {
  /**
   * Function to handle field update events by retrieving the target value.
   */
  updateField: (event: Event) => void;
}
