/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the base of an {@link Application} status field.
 */
export interface BaseStatus {
  /**
   * The status's uuid.
   */
  readonly uuid: string;

  /**
   * The status's name.
   */
  readonly name: string;
}
