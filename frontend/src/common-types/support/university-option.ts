/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { BaseSupport } from './base-support.ts';

/**
 * Defines a university option object.
 */
export interface UniversityOption extends BaseSupport {
  readonly abbreviation: string;
}
