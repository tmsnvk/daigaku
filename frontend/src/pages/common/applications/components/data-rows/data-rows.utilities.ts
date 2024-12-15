/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Column } from '../../applications.hooks.tsx';

/**
 * ===============
 * Helper Method {@link shouldColumnBeVisible}
 * ===============
 */

/**
 * Determines if a column with a specific `columnId` is found in the array of columns to be displayed
 * and returns its `isVisible` value.
 *
 * @param columns An array of column objects.
 * @param columnId The id for the column to search for.
 * @return {boolean}
 *
 * @since 0.0.1
 */
export const shouldColumnBeVisible = (columns: Array<Column>, columnId: string): boolean => {
  const column: Column | undefined = columns.find((column: Column) => column.id === columnId);

  return column ? column.isVisible : false;
};
