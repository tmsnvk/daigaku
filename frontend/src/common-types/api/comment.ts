/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { CoreMetadata } from '../core/core-metada.ts';

/**
 * Defines the structure of a new comment to be submitted.
 */
export interface CreateCommentPayload {
  /**
   * The text content of the comment.
   */
  readonly comment: string;
}

/**
 * Defines the properties of a comment associated with a given application-record.
 */
export interface Comment extends CoreMetadata {
  /**
   * The comment's uuid.
   */
  readonly uuid: string;

  /**
   * The text content of the comment.
   */
  readonly comment: string;
}

/**
 * Defines the metadata and the list of comments associated with a given application-record.
 */
export interface CommentPaginationDataResponse {
  /**
   * The total number of comment pages.
   */
  readonly totalPages: number;

  /**
   * The current page number of the comments being viewed.
   */
  readonly currentPage: number;

  /**
   * The total number of comments.
   */
  readonly totalComments: number;

  /**
   * A list of comments associated.
   */
  readonly comments: Array<Comment>;
}
