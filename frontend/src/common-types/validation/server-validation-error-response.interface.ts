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
 * The interface represents the validation error response object for a given form field.
 *
 * @since 0.0.1
 */
export interface ServerValidationErrorResponse {
  fieldName: string;
  errorMessage: string;
}
