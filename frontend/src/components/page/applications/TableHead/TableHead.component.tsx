import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseQueryResult } from '@tanstack/react-query';
import {
  ButtonTh,
  TableHeadContainer,
} from './TableHead.styles.ts';
import { iconLibraryConfig } from '@configuration';
import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';

type ComponentPropsT = {
  columns: ColumnT[];
  handleColumnSort: (id: string) => void;
  toggleModal: () => void;
  refetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;
}

const TableHead = ({ columns, handleColumnSort, toggleModal, refetch }: ComponentPropsT) => {
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
              <FontAwesomeIcon icon={iconLibraryConfig.faSort} />
            </button>
          </th>
        );
      })}
      <ButtonTh>
        <button
          type={'button'}
          onClick={() => refetch({ cancelRefetch: false })}
        >
          Refresh
          <FontAwesomeIcon icon={iconLibraryConfig.faRotateRight} />
        </button>
        <button
          type={'button'}
          onClick={toggleModal}
        >
          Display
          <FontAwesomeIcon icon={iconLibraryConfig.faTable} />
        </button>
      </ButtonTh>
    </TableHeadContainer>
  );
};

export default TableHead;
