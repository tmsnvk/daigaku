/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the structure of an object responsible for handling field update events.
 */
export interface FieldUpdate {
  /**
   * A callback method to handle field update events by retrieving the target value.
   */
  updateField: (event: Event) => void;
}
