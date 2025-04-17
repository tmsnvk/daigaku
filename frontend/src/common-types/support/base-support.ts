/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the base of application support option models.
 */
export interface BaseSupport {
  /**
   * The option's uuid.
   */
  readonly uuid: string;

  /**
   * The option's name.
   */
  readonly name: string;
}
