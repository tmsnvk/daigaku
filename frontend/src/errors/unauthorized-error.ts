/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { CoreApiError } from './core-api-error.ts';

/* interface, type, enum, schema imports */
import { CoreInputErrorResponse } from '@daigaku/common-types';

/**
 *
 */
export class UnauthorizedError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreInputErrorResponse) {
    super('UnauthorizedError', statusCode, coreError);
  }
}
