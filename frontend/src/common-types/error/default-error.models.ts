/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines a single error detail.
 */
export interface ErrorDetail {
  /**
   * The error message.
   */
  readonly errorMessage: string;

  /**
   * Equals to the input field's name property.
   */
  readonly fieldName: string;
}

/**
 * Defines the default error object used throughout the application.
 */
export interface CoreErrorResponse {
  /**
   * The HTTP Status error code.
   */
  readonly errorCode: number;

  /**
   * The list of errors received from the backend part of the application.
   */
  readonly errors: Array<ErrorDetail>;

  /**
   * The error's timestamp string.
   */
  readonly timestamp: string;
}
