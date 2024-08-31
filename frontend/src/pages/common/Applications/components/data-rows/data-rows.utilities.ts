/**
 * @prettier
 */

/* interface, type, enum imports */
import { Column } from '../../applications.hooks.tsx';

/*
 * custom method - TODO - add functionality description
 */
export const isColumnFound = (columns: Array<Column>, columnId: string): boolean => {
  return columns.find((column) => column.id === columnId)?.isActive ?? false;
};
