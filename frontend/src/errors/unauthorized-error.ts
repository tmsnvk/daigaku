/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { CoreApiError } from './core-api-error.ts';

/* interface, type, enum, schema imports */
import { CoreErrorResponse } from '@daigaku/common-types';

/**
 *
 */
export class UnauthorizedError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreErrorResponse) {
    super('UnauthorizedError', statusCode, coreError);
  }
}
