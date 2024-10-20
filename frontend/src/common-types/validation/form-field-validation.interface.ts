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

/**
 * Defines validation rules for an input using `react-hook-form`.
 *
 * @since 0.0.1
 */
export interface FormFieldValidation {
  /**
   * Whether the input is mandatory to fill in and a custom error message if it is violated.
   */
  required?: {
    value: boolean;
    message: string;
  };

  /**
   * Whether the input has a pattern to match and a custom error message if it is violated.
   */
  pattern?: {
    value: RegExp;
    message: string;
  };
}
