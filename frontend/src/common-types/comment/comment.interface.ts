/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { BaseMetadata } from '../metadata/base-metada.interface';

/**
 * Defines a comment associated with a given {@link Application}.
 * Represents an individual comment that can be created on the {@link Application}
 * and includes metadata about the comment's lifecycle and author.
 */
export interface Comment extends BaseMetadata {
  /**
   * The comment's uuid.
   */
  readonly uuid: string;

  /**
   * The text content of the comment.
   */
  readonly comment: string;
}
