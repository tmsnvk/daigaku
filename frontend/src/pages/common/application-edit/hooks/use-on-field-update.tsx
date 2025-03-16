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
   * The callback method handling field update events by retrieving the target value.
   */
  updateField: (event: Event) => void;
}

/**
 * Manages field update events. Captures the value from the event target and passes it to the provided `onFieldUpdate` callback.
 *
 * @param onFieldUpdate The callback method handling the target value from the field update.
 * @return {FieldUpdate}
 */
export const useOnFieldUpdate = (onFieldUpdate: ((eventTargetValue: string) => void) | undefined): FieldUpdate => {
  const updateField = (event: Event): void => {
    const target = event.target as HTMLSelectElement | null;

    if (onFieldUpdate !== undefined && target !== null) {
      onFieldUpdate(target.value);
    }
  };

  return {
    updateField,
  };
};
