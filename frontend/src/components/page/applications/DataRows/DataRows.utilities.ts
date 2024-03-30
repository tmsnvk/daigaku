import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';

const findColumn = ($columns: ColumnT[], $columnId: string) => {
  return $columns?.find((column) => column.id === $columnId)?.isActive;
};

export {
  findColumn,
};
