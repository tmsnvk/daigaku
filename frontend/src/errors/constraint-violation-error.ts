/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { CoreApiError } from './core-api-error.ts';

/* interface, type imports */
import { CoreInputErrorResponse } from '@daigaku/common-types';

/**
 * JPA entity validation db / write fails.
 */
export class ConstraintViolationError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreInputErrorResponse) {
    super('ConstraintViolationError', statusCode, coreError);
  }
}
