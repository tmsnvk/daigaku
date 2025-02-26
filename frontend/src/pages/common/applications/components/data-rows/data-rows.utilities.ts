/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Column } from '../../applications.models';

/**
 * Determines whether a column with a specific `columnId` is found in the array of columns to be displayed
 * and returns its `isVisible` value.
 *
 * @param columns The array of column objects.
 * @param columnId The column's id to search for.
 * @return {boolean}
 */
export const isColumnVisible = (columns: Array<Column>, columnId: string): boolean => {
  const column: Column | undefined = columns.find((column: Column) => column.id === columnId);

  return column ? column.isVisible : false;
};
