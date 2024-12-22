/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/**
 * Defines the core properties of input fields used with `react-hook-form`.
 * The interface is intended to standardize the properties across various input types
 * that utilize the `react-hook-form` library for form handling and validation.
 */
export interface CoreInput<T extends FieldValues> {
  /**
   * The `react-hook-form` register method used for input registration and handling.
   * This method connects the input to the form state and validation.
   */
  register: UseFormRegister<T>;

  /**
   * Optional validation rules to handle input validation in `react-hook-form`.
   */
  validationRules?: CoreInputValidation;

  /**
   * The error message associated with the input, if validation fails.
   */
  error: string | undefined;

  /**
   * The input element's id.
   */
  id: Path<T>;

  /**
   * Indicates whether the input is disabled, preventing user interaction.
   */
  isDisabled?: boolean;
}

/**
 * Defines validation rules for an input field using `react-hook-form`.
 * This interface specifies the criteria for input validation,
 * including required fields and patterns for matching input values, along with custom error messages.
 */
interface CoreInputValidation {
  /**
   * Specifies whether the input is required to be filled in.
   * If the requirement is violated, the provided custom error message is displayed for the user.
   */
  required?: {
    value: boolean;
    message: string;
  };

  /**
   * Specifies whether the input must match a certain pattern.
   * If the requirement is violated, the provided custom error message is displayed for the user.
   */
  pattern?: {
    value: RegExp;
    message: string;
  };
}
