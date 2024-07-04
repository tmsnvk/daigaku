import { UseQueryResult } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSendDownloadRequest } from './TableHead.hooks.tsx';

import { GlobalErrorModal } from '@components/notification';
import { LoadingIndicator } from '@components/general';
import {
  ButtonHeaderCell,
  TableHeadRow,
} from './TableHead.styles.ts';

import { iconLibraryConfig } from '@configuration';

import { ColumnT } from '../../Applications.hooks.tsx';

type ComponentPropsT = {
  columns: ColumnT[];
  columnSortHandler: (id: string) => void;
  toggleModalHandler: () => void;
  refetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;
}

const TableHead = ({
  columns,
  columnSortHandler,
  toggleModalHandler,
  refetch,
}: ComponentPropsT) => {
  const { mutate, isPending, isError } = useSendDownloadRequest();

  if (isError) {
    return <GlobalErrorModal content={'An error happened during your request. Refresh your browser or try again at a later time.'} />;
  }

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
              <FontAwesomeIcon
                icon={iconLibraryConfig.faSort}
              />
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
          <FontAwesomeIcon
            icon={iconLibraryConfig.faRotateRight}
          />
        </button>
        <button
          type={'button'}
          onClick={toggleModalHandler}
        >
          Display
          <FontAwesomeIcon
            icon={iconLibraryConfig.faTable}
          />
        </button>
        {
          isPending ?
            <LoadingIndicator content={'Handling your request...'} /> :
            <button
              type={'button'}
              onClick={() => mutate()}
            >
              Download
              <FontAwesomeIcon
                icon={iconLibraryConfig.faFileArrowDown}
              />
            </button>
        }
      </ButtonHeaderCell>
    </TableHeadRow>
  );
};

export default TableHead;
