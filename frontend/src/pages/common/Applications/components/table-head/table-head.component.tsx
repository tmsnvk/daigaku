/**
 * @prettier
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { SendDownloadRequest, useSendDownloadRequest } from './table-head.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal } from '@components/notification';
import { ButtonHeaderCell, TableHeadRow } from './table-head.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* interface, type, enum imports */
import { Column } from '../../applications.hooks';

/* interfaces, types, enums */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly columnSortHandler: (id: string) => void;
  readonly toggleModalHandler: () => void;
  readonly refetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;
}

/*
 * component - TODO - add functionality description
 */
export const TableHead = ({ columns, columnSortHandler, toggleModalHandler, refetch }: ComponentProps) => {
  const { mutate, isPending, isError }: SendDownloadRequest = useSendDownloadRequest();

  if (isError) {
    return <GlobalErrorModal message={'An error happened during your request. Refresh your browser or try again at a later time.'} />;
  }

  return (
    <TableHeadRow>
      {columns.map((column: Column) => {
        return (
          column.isActive && (
            <th key={column.id}>
              <button
                type={'button'}
                onClick={() => columnSortHandler(column.id)}
              >
                {column.name}
                <FontAwesomeIcon icon={iconLibraryConfig.faSort} />
              </button>
            </th>
          )
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
        {isPending ? (
          <LoadingIndicator loadingText={'Handling your request...'} />
        ) : (
          <button
            type={'button'}
            onClick={() => mutate()}
          >
            Download
            <FontAwesomeIcon icon={iconLibraryConfig.faFileArrowDown} />
          </button>
        )}
      </ButtonHeaderCell>
    </TableHeadRow>
  );
};
