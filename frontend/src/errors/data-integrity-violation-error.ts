/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { CoreApiError } from './core-api-error.ts';

/* interface, type imports */
import { CoreInputErrorResponse, ExceptionTypes } from '@daigaku/common-types';

/**
 *
 */
export class DataIntegrityViolationError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreInputErrorResponse) {
    super(ExceptionTypes.DATA_INTEGRITY_VIOLATION, statusCode, coreError);
  }
}
