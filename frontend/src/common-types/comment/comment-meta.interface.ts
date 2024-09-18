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

/* interface, type, enum imports */
import { Comment } from './comment.interface';

export interface CommentMeta {
  readonly totalPages: number;
  readonly currentPage: number;
  readonly totalComments: number;
  readonly comments: Array<Comment>;
}
