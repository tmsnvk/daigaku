/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { BaseSupport } from './base-support.ts';

/**
 * Defines an institution option object.
 */
export interface InstitutionOption extends BaseSupport {
  readonly city: string;
}
