/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* interface, type, enum imports */
import { FormInputValidation } from '@common-types';

/**
 * Defines the core properties of inputs used with `react-hook-form`.
 * This interface is intended to standardize the properties across various input types
 * that utilize the `react-hook-form` library for form handling and validation.
 *
 * @since 0.0.1
 */
export interface CoreInput<T extends FieldValues> {
  /**
   * The `react-hook-form` register method used for input registration and handling.
   * This method connects the input to the form state and validation.
   */
  register: UseFormRegister<T>;

  /**
   * Optional validation rules for handling input validation in `react-hook-form`.
   */
  validationRules?: FormInputValidation;

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
