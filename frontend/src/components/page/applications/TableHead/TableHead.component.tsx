import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseQueryResult } from '@tanstack/react-query';
import {
  ButtonHeaderCell,
  TableHeadRow,
} from './TableHead.styles.ts';
import { iconLibraryConfig } from '@configuration';
import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';

type ComponentPropsT = {
  columns: ColumnT[];
  columnSortHandler: (id: string) => void;
  toggleModalHandler: () => void;
  refetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;
}

const TableHead = ({ columns, columnSortHandler, toggleModalHandler, refetch }: ComponentPropsT) => {
  return (
    <TableHeadRow>
      {columns.map((column) => {
        return (
          column.isActive &&
          <th key={column.id}>
            <button
              type={'button'}
              onClick={() => columnSortHandler(column.id)}
            >
              {column.name}
              <FontAwesomeIcon icon={iconLibraryConfig.faSort} />
            </button>
          </th>
        );
      })}
      <ButtonHeaderCell>
        <button
          type={'button'}
          onClick={() => refetch({ cancelRefetch: false })}
        >
          Refresh
          <FontAwesomeIcon icon={iconLibraryConfig.faRotateRight} />
        </button>
        <button
          type={'button'}
          onClick={toggleModalHandler}
        >
          Display
          <FontAwesomeIcon icon={iconLibraryConfig.faTable} />
        </button>
      </ButtonHeaderCell>
    </TableHeadRow>
  );
};

export default TableHead;
