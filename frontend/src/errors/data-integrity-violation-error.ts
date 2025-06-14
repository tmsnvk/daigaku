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
 *
 */
export class DataIntegrityViolationError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreInputErrorResponse) {
    super('DataIntegrityViolationError', statusCode, coreError);
  }
}
