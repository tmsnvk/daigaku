/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum, schema imports */
import { CoreErrorResponse } from '@daigaku/common-types';

export class CoreApiError extends Error {
  public name: string;
  public statusCode?: number;
  public coreError?: CoreErrorResponse;

  constructor(name: string, statusCode?: number, coreError?: CoreErrorResponse) {
    super(name);

    this.name = name;
    this.statusCode = statusCode;
    this.coreError = coreError;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
