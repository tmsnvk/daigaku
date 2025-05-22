/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { CoreApiError } from './CoreApiError';

/* interface, type, enum, schema imports */
import { CoreErrorResponse } from '@daigaku/common-types';

/**
 *
 */
export class UnauthorizedError extends CoreApiError {
  constructor(coreError: CoreErrorResponse) {
    super('UnauthorizedError', coreError);
  }
}
