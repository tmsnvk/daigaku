import { Column } from '../../applications.hooks.tsx';

const isColumnFound = (columns: Array<Column>, columnId: string): boolean => {
  return columns.find((column) => column.id === columnId)?.isActive ?? false;
};

export {
  isColumnFound,
};
