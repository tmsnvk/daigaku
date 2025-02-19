/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the base metadata details for various objects across the application.
 */
export interface BaseMetadata {
  /**
   * The date and time when the object was created.
   */
  readonly createdAt: Date;

  /**
   * The date and time when the object was last updated.
   */
  readonly lastUpdatedAt: Date;

  /**
   * The identifier of the user who created the object.
   */
  readonly createdBy: string;

  /**
   * The identifier of the user who last modified the object.
   */
  readonly lastModifiedBy: string;
}
