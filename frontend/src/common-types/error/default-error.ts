/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the backend-specific exception identifiers.
 */
export const ExceptionTypes = {
  BAD_CREDENTIALS: 'BadCredentialsException',
  CONSTRAINT_VIOLATION: 'ConstraintViolationException',
  DATA_INTEGRITY_VIOLATION: 'DataIntegrityViolationException',
  DATA_RETRIEVAL_FAILURE: 'DataRetrievalFailureException',
  ENTITY_NOT_FOUND: 'EntityNotFoundException',
  METHOD_ARGUMENT_NOT_VALID: 'MethodArgumentNotValidException',
  METHOD_ARGUMENT_TYPE_MISMATCH: 'MethodArgumentTypeMismatchException',
} as const;

export type ExceptionType = (typeof ExceptionTypes)[keyof typeof ExceptionTypes];

/**
 * Defines a single error detail.
 */
export interface InputViolation {
  /**
   * Describes the error message associated with a specific field.
   */
  readonly message: string;

  /**
   * The name of the form field this error applies to.
   */
  readonly fieldName: string;
}

/**
 * Defines the default error object used throughout the application.
 */
export interface CoreInputErrorResponse {
  /**
   * HTTP status code.
   */
  readonly httpStatusCodeValue: number;

  /**
   * Textual representation of the HTTP status code.
   */
  readonly httpStatusCodeName: string;

  /**
   * The backend-specific exception identifier.
   */
  readonly exceptionType: ExceptionType;

  /**
   * The list of errors received from the backend.
   */
  readonly errors: Array<InputViolation>;

  /**
   * The error's timestamp string.
   */
  readonly timestamp: string;
}
