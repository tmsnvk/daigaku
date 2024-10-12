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

/**
 * The interface represents the high level data of all comments associated with a given {@link Application}.
 *
 * @since 0.0.1
 */
export interface CommentMeta {
  readonly totalPages: number;
  readonly currentPage: number;
  readonly totalComments: number;
  readonly comments: Array<Comment>;
}
