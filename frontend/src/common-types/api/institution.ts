/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum, schema imports */
import { CoreSupport } from '../core/core-support.ts';

/**
 * Defines the properties of an institution option.
 */
export interface InstitutionOption extends CoreSupport {
  readonly city: string;
}
