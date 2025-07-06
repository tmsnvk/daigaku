/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { CoreSupport } from '../api-core/core-support.ts';

/**
 * Defines the properties of an institution option.
 */
export interface InstitutionOptionResponse extends CoreSupport {
  readonly city: string;
}
