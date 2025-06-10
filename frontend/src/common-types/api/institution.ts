/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { CoreSupport } from '../core/core-support.ts';

/**
 * Defines the properties of an institution option.
 */
export interface InstitutionOption extends CoreSupport {
  readonly city: string;
}
