import { ColumnT } from '../../Applications.hooks.tsx';

const isColumnFound = (columns: ColumnT[], columnId: string) => {
  return columns.find((column) => column.id === columnId)?.isActive ?? false;
};

export {
  isColumnFound,
};
