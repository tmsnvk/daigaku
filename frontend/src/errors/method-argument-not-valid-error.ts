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
 * Server payload object validation fails.
 */
export class MethodArgumentNotValidError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreInputErrorResponse) {
    super('MethodArgumentNotValidError', statusCode, coreError);
  }
}
