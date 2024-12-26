/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { JSX } from 'react';

/* logic imports */
import { useRequestPdfDownload } from './table-header.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, Toast } from '@components/notification';
import { TableHeadRow } from './table-header.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';
import { constants } from './table-header.constants';

/* interface, type, enum imports */
import { Column } from '../../applications.models';
import { RequestPdfDownload } from './table-header.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * TODO
   */
  readonly columns: Array<Column>;

  /**
   * TODO
   */
  readonly onColumnSort: (id: string) => void;

  /**
   * TODO
   */
  readonly onToggleModal: () => void;

  /**
   * TODO
   */
  readonly onRefetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;
}

/**
 * Renders the table header row on the {@link Applications} page. A number of buttons are rendered in the component as well, such as
 * row ordering, .pdf report downloading, data refresh or modal pop-up buttons.
 *
 * @return {JSX.Element}
 */
export const TableHeader = ({ columns, onColumnSort, onToggleModal, onRefetch }: ComponentProps): JSX.Element => {
  const { mutate, isSuccess, isPending, isError, error }: RequestPdfDownload = useRequestPdfDownload();

  if (isError) {
    let errorMessage = '';

    if (axios.isAxiosError(error)) {
      errorMessage = UNEXPECTED_SERVER_ERROR;
    } else {
      errorMessage = UNEXPECTED_GLOBAL_ERROR;
    }

    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={errorMessage}
        onCloseModal={() => console.log('TODO - fix me')}
      />
    );
  }

  return (
    <>
      <TableHeadRow>
        {columns.map((column: Column) => {
          return (
            column.isVisible && (
              <th key={column.id}>
                <button
                  type={'button'}
                  onClick={() => onColumnSort(column.id)}
                >
                  {column.name}
                  <FontAwesomeIcon icon={iconLibraryConfig.faSort} />
                </button>
              </th>
            )
          );
        })}
        <th>
          <button
            type={'button'}
            onClick={() => onRefetch({ cancelRefetch: false })}
          >
            Refresh
            <FontAwesomeIcon icon={iconLibraryConfig.faRotateRight} />
          </button>
          <button
            type={'button'}
            onClick={onToggleModal}
          >
            Display
            <FontAwesomeIcon icon={iconLibraryConfig.faTable} />
          </button>
          {isPending ? (
            <LoadingIndicator loadingText={constants.ui.download.REQUEST} />
          ) : (
            <button
              type={'button'}
              onClick={() => mutate()}
            >
              Download
              <FontAwesomeIcon icon={iconLibraryConfig.faFileArrowDown} />
            </button>
          )}
        </th>
      </TableHeadRow>
      <Toast
        isVisible={isSuccess}
        message={constants.ui.download.TOAST}
      />
    </>
  );
};
