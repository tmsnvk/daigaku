/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
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
