/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the base properties of Application support option objects.
 */
export interface CoreSupport {
  /**
   * The support object's uuid.
   */
  readonly uuid: string;

  /**
   * The support object's name.
   */
  readonly name: string;
}
