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
   * The <TFormValues> field's error object.
   */
  readonly error: FieldError | undefined;
}

/**
 * A custom hook to retrieve the field state for a specific form field.
 *
 * @template TFormValues - Form field values
 * @param fieldId The id of the form field.
 * @returns {string | undefined} The field error message and metadata about the field state.
 */
export const useFieldValidationError = <TFormValues extends FieldValues>(fieldId: Path<TFormValues>): FieldValidationError => {
  const { getFieldState } = useFormContext<TFormValues>();
  const fieldState = getFieldState(fieldId);

  return {
    error: fieldState.error,
  };
};
