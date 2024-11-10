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
 * Defines the default error object used throughout the application.
 *
 * @since 0.0.1
 */
export interface DefaultErrorResponse {
  readonly errorCode: number;
  readonly errors: Array<ErrorDetail>;
  readonly timestamp: string;
}

export interface ErrorDetail {
  errorMessage: string;
  fieldName: string;
}
