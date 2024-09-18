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

export interface Comment {
  readonly uuid: string;
  readonly comment: string;
  readonly createdAt: number;
  readonly lastUpdatedAt: number;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
}
