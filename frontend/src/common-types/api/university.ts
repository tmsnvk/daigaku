/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { CoreSupport } from '../api-core/core-support.ts';

/**
 * Defines the properties of a university option.
 */
export interface UniversityOptionResponse extends CoreSupport {
  readonly abbreviation: string;
}
