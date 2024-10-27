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
 * Defines the validation error response for a specific form field from the server.
 * This interface represents the structure of error responses received when a form field fails validation due to server-side rules.
 *
 * @since 0.0.1
 */
export interface ServerValidationErrorResponse {
  /**
   * The name of the input that violated validation, corresponding to the input's name property.
   */
  fieldName: string;

  /**
   * The custom error message returned from the server for the validation error.
   */
  errorMessage: string;
}
