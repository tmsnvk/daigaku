/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { CoreComment } from '../api-core/core-comment.ts';
import { CoreMetadata } from '../api-core/core-metada.ts';

/**
 * Defines the properties of a comment associated with a given Application.
 */
export interface ApplicationCommentResponse extends CoreMetadata, CoreComment {}

/**
 * Defines the structure of a new ApplicationComment to be submitted.
 */
export interface CreateApplicationCommentPayload {
  /**
   * The text of the ApplicationComment.
   */
  readonly comment: string;
}

/**
 * Defines the metadata and the list of ApplicationComment associated with a given Application.
 */
export interface ApplicationCommentPaginationDataResponse {
  /**
   * The total number of ApplicationComment pages.
   */
  readonly totalPages: number;

  /**
   * The current page number of the ApplicationComment being viewed.
   */
  readonly currentPage: number;

  /**
   * The total number of ApplicationComment.
   */
  readonly totalComments: number;

  /**
   * A list of ApplicationComment associated.
   */
  readonly comments: Array<ApplicationCommentResponse>;
}
