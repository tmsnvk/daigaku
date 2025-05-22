/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum, schema imports */
import { CoreErrorResponse } from '@daigaku/common-types';

export class CoreApiError extends Error {
  public coreError: CoreErrorResponse;

  constructor(name: string, coreError: CoreErrorResponse) {
    super(name);

    this.name = name;
    this.coreError = coreError;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
