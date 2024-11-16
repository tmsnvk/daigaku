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

/**
 * Defines a comment associated with a given {@link Application}.
 * Represents individual comments that can be made on the {@link Application} and includes metadata about the comment's lifecycle and author.
 *
 * @since 0.0.1
 */
export interface Comment {
  /**
   * The comment's uuid.
   */
  readonly uuid: string;

  /**
   * The text content of the comment.
   */
  readonly comment: string;

  /**
   * The date and time when the comment was created.
   */
  readonly createdAt: Date;

  /**
   * The date and time when the comment was last updated.
   */
  readonly lastUpdatedAt: Date;

  /**
   * The identifier of the user who created the comment.
   */
  readonly createdBy: string;

  /**
   * The identifier of the user who last modified the comment.
   */
  readonly lastModifiedBy: string;
}
