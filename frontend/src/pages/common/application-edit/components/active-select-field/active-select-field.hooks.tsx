/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { FieldUpdate } from './active-select-field.models';

/**
 * Manages field update events.
 * Captures the value from the event target and passes it to the provided `onFieldUpdate` callback.
 *
 * @param onFieldUpdate A callback method to handle the target value from the field update.
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
