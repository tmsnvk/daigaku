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
 */
export interface CoreErrorResponse {
  readonly errorCode: number;
  readonly errors: Array<ErrorDetail>;
  readonly timestamp: string;
}

/**
 * Defines a single error detail.
 */
export interface ErrorDetail {
  errorMessage: string;
  fieldName: string;
}
