/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldValues, Path } from 'react-hook-form';

/**
 * Defines the core properties of input fields used with `react-hook-form`.
 * The interface standardizes basic properties across various input types
 * that utilize the `react-hook-form` library for form handling and validation.
 */
export interface CoreFormElementValidation<T extends FieldValues> {
  /**
   * The input element's id.
   */
  readonly id: Path<T>;

  /**
   * Optional validation rules to handle input validation in `react-hook-form`.
   */
  readonly validationRules?: {
    /**
     * Specifies whether the input is required to be filled in.
     * If the requirement is violated, the provided custom error message is displayed for the user.
     */
    readonly required?: {
      value: boolean;
      message: string;
    };

    /**
     * Specifies whether the input must match a certain pattern.
     * If the requirement is violated, the provided custom error message is displayed for the user.
     */
    readonly pattern?: {
      value: RegExp;
      message: string;
    };
  };

  /**
   * The error message associated with the input, if validation fails.
   */
  readonly error?: string;

  /**
   * Indicates whether the input is disabled, preventing user interaction.
   */
  readonly isDisabled: boolean;
}
