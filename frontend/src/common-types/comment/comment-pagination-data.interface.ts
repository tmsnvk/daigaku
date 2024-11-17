/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
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
   * The total number of pages available for comments.
   */
  readonly totalPages: number;

  /**
   * The current page number of the comments being viewed.
   */
  readonly currentPage: number;

  /**
   * The total number of comments associated with the given {@link Application} object.
   */
  readonly totalComments: number;

  /**
   * A list of comments associated with the given {@link Application} object.
   */
  readonly comments: Array<Comment>;
}
