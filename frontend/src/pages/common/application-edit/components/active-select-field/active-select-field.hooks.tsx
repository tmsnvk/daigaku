/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * ===============
 * Custom Hook {@link useOnFieldUpdate}
 * ===============
 */

/**
 * Defines the structure for the field update function returned by {@link useOnFieldUpdate}.
 *
 * @since 0.0.1
 */
export interface FieldUpdate {
  /**
   * Function to handle field update events by retrieving the target value.
   */
  updateField: (event: Event) => void;
}

/**
 * Manages field update events.
 * Captures the value from the event target and passes it to the provided `onFieldUpdate` callback.
 *
 * @param onFieldUpdate Callback function to handle the target value from the field update.
 * @return {FieldUpdate}
 *
 * @since 0.0.1
 */
export const useOnFieldUpdate = (onFieldUpdate: ((eventTargetValue: string) => void) | undefined): FieldUpdate => {
  const updateField = (event: Event) => {
    // Cast event target to HTMLSelectElement.
    const target = event.target as HTMLSelectElement | null;

    if (onFieldUpdate !== undefined && target) {
      // Passes the selected value to the callback.
      onFieldUpdate(target.value);
    }
  };

  return {
    updateField,
  };
};
