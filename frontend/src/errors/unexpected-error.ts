/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { CoreApiError } from './core-api-error.ts';

/**
 *
 */
export class UnexpectedError extends CoreApiError {
  constructor() {
    super('UnexpectedError');
  }
}
