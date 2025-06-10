/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { CoreSupport } from '../core/core-support.ts';

/**
 * Defines the properties of a university option.
 */
export interface UniversityOption extends CoreSupport {
  readonly abbreviation: string;
}
