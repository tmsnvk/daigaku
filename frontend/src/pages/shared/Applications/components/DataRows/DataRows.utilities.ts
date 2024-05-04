import { ColumnT } from '../../Applications.hooks.tsx';

const findColumn = ($columns: ColumnT[], $columnId: string) => {
  return $columns.find((column) => column.id === $columnId)?.isActive ?? false;
};

export {
  findColumn,
};
