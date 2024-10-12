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
 * The interface represents the `react-hook-form` validation rules for a form field.
 * The interface defines the structure for the validation criteria that can be applied to a form field.
 *
 * @since 0.0.1
 */
export interface FormFieldValidation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}
