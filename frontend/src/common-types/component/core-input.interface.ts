/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';

/**
 * Defines the core properties of `react-hook-form` inputs.
 *
 * @since 0.0.1
 */
export interface CoreInput<T extends FieldValues> {
  /**
   * The `react-hook-form` register method for input handling.
   */
  register: UseFormRegister<T>;

  /**
   * Optional validation rules for `react-hook-form` validation handling.
   */
  validationRules?: FormFieldValidation;

  /**
   * The error message, if any, related to the input.
   */
  error: string | undefined;

  /**
   * Input id.
   */
  id: Path<T>;

  /**
   * Input disabled status indicator.
   */
  isDisabled: boolean;
}
