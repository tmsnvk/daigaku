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
 * This interface specifies the criteria for input validation, including required fields and patterns for matching input values, along with custom error messages.
 *
 * @since 0.0.1
 */
export interface FormInputValidation {
  /**
   * Specifies whether the input is required to be filled in.
   * If the requirement is violated, the provided custom error message is displayed.
   */
  required?: {
    value: boolean;
    message: string;
  };

  /**
   * Specifies whether the input must match a certain pattern.
   * If the requirement is violated, the provided custom error message is displayed.
   */
  pattern?: {
    value: RegExp;
    message: string;
  };
}
