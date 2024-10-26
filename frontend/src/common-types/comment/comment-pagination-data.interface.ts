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
 * Defines metadata and the list of comments associated with a given {@link Application}.
 *
 * @since 0.0.1
 */
export interface CommentPaginationData {
  /**
   * The total page number.
   */
  readonly totalPages: number;

  /**
   * The current page number.
   */
  readonly currentPage: number;

  /**
   * The number of total comments under the given {@link Application} object.
   */
  readonly totalComments: number;

  /**
   * The list of comments under the given {@link Application} object.
   */
  readonly comments: Array<Comment>;
}
