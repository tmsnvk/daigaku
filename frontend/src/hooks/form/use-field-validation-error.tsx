/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldError, FieldValues, Path, useFormContext } from 'react-hook-form';

/**
 * Defines the properties of the {@link useFieldValidationError} hook.
 */
interface FieldValidationError {
  /**
   * The <T> field's error object.
   */
  readonly error: FieldError | undefined;
}

/**
 * A custom hook to retrieve the field state for a specific form field.
 *
 * @template T - Form field values
 * @param fieldId The id of the form field.
 * @returns {string | undefined} The field error message and metadata about the field state.
 */
export const useFieldValidationError = <T extends FieldValues>(fieldId: Path<T>): FieldValidationError => {
  const { getFieldState } = useFormContext<T>();
  const fieldState = getFieldState(fieldId);

  return {
    error: fieldState.error,
  };
};
