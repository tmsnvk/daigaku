import {
  SortIcon,
  TableHeadContainer,
} from './TableHead.styles.ts';
import { iconLibraryConfig } from '@configuration';
import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';

type ComponentPropsT = {
  columns: ColumnT[];
  handleColumnSort: (id: string) => void;
  toggleModal: () => void;
}

const TableHead = ({ columns, handleColumnSort, toggleModal }: ComponentPropsT) => {
  return (
    <TableHeadContainer>
      {columns.map((column) => {
        return (
          column.isActive &&
          <th key={column.id}>
            <button
              type={'button'}
              onClick={() => handleColumnSort(column.id)}
            >
              {column.name}
              <SortIcon icon={iconLibraryConfig.faSort} />
            </button>
          </th>
        );
      })}
      <th>
        <button
          type={'button'}
        >
          Refresh
        </button>
      </th>
      <th>
        <button
          type={'button'}
          onClick={toggleModal}
        >
          Display
        </button>
      </th>
    </TableHeadContainer>
  );
};

export default TableHead;
