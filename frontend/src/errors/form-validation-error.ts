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
 * Firm choice / final destination validation on backend.
 */
export class FormValidationError extends CoreApiError {
  constructor(statusCode: number, coreError: CoreInputErrorResponse) {
    super(ExceptionTypes.FORM_VALIDATION, statusCode, coreError);
  }
}
