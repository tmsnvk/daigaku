/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum, schema imports */
import { CoreSupport } from '../core/core-support.ts';

/**
 * Defines the properties of a university option.
 */
export interface UniversityOption extends CoreSupport {
  readonly abbreviation: string;
}
