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
export class ServerError extends CoreApiError {
  constructor(statusCode: number) {
    super('ServerError', statusCode);
  }
}
