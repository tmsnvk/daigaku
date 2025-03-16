/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the core properties of a single column.
 */
export interface Column {
  /**
   * The column's id.
   */
  readonly id: string;

  /**
   * The column's name.
   */
  readonly name: string;

  /**
   * The flag indicating whether a column is a core column.
   */
  readonly isCoreColumn: boolean;

  /**
   * The column's visibility flag.
   */
  readonly isVisible: boolean;
}
