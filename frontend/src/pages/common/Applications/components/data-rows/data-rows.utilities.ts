/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* interface, type, enum imports */
import { Column } from '../../applications.hooks.tsx';

/**
 * ===============
 * Helper Method {@link shouldColumnBeVisible}
 * ===============
 */

/**
 * The helper method determines if a column with a specific `columnId` is found in the array of columns to be displayed
 * and returns its `isVisible` value.
 *
 * @param columns An array of column objects.
 * @param columnId The id for the column to search for.
 *
 * @returns {boolean} If the column is found, its `isVisible` property is returned, otherwise `false` is returned.
 *
 * @since 0.0.1
 */
export const shouldColumnBeVisible = (columns: Array<Column>, columnId: string): boolean => {
  const column: Column | undefined = columns.find((column: Column) => column.id === columnId);

  if (column) {
    return column.isVisible;
  }

  return false;
};
