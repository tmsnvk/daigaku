/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Comment } from './comment.models';

/**
 * Defines the metadata and the list of comments associated with a given Application record.
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
   * The total number of comments associated with the given Application record.
   */
  readonly totalComments: number;

  /**
   * A list of comments associated with the given Application record.
   */
  readonly comments: Array<Comment>;
}
