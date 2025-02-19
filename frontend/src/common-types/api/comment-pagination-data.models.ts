/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Comment } from './comment.models';

/**
 * Defines the metadata and the list of comments associated with a given application record.
 */
export interface CommentPaginationData {
  /**
   * The total number of comment pages associated with the given application record.
   */
  readonly totalPages: number;

  /**
   * The current page number of the comments being viewed.
   */
  readonly currentPage: number;

  /**
   * The total number of comments associated with the given application record.
   */
  readonly totalComments: number;

  /**
   * A list of comments associated with the given application record.
   */
  readonly comments: Array<Comment>;
}
