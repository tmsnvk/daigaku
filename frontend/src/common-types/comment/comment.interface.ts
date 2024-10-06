/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/**
 * @interface
 * @description
 * The interface represents a single comment associated with a given {@link Application}.
 *
 * @since 0.0.1
 */
export interface Comment {
  readonly uuid: string;
  readonly comment: string;
  readonly createdAt: number;
  readonly lastUpdatedAt: number;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
}
