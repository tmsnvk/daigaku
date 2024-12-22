/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Comment } from './comment.interface';

/**
 * Defines the metadata and the list of comments associated with a given {@link Application}.
 */
export interface CommentPaginationData {
  /**
   * The total number of pages.
   */
  readonly totalPages: number;

  /**
   * The current page of the comments being viewed.
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
