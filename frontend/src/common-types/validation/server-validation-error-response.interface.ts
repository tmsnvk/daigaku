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
 * Defines the validation error response for a specific form field.
 *
 * @since 0.0.1
 */
export interface ServerValidationErrorResponse {
  /**
   * The name of the violated input. It is equal to the input's name property.
   */
  fieldName: string;

  /**
   * The customised error message received from the server.
   */
  errorMessage: string;
}
