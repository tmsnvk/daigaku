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

/*
 * custom method - TODO - add functionality description
 */
export const isColumnFound = (columns: Array<Column>, columnId: string): boolean => {
  return columns.find((column) => column.id === columnId)?.isVisible ?? false;
};
