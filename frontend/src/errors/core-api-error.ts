/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum, schema imports */
import { CoreInputErrorResponse } from '@daigaku/common-types';

export class CoreApiError extends Error {
  public name: string;
  public statusCode?: number;
  public coreError?: CoreInputErrorResponse;

  constructor(name: string, statusCode?: number, coreError?: CoreInputErrorResponse) {
    super(name);

    this.name = name;
    this.statusCode = statusCode;
    this.coreError = coreError;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
