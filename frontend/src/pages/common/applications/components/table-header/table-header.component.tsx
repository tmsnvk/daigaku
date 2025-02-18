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
import { GlobalErrorModal } from '@components/notification';
import { TableHeadRow } from './table-header.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { errorConstants } from '@constants';
import { constants } from './table-header.constants';

/* interface, type, enum imports */
import { Column } from '../../applications.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The list of columns that should be displayed by the component.
   */
  readonly columns: Array<Column>;

  /**
   * A boolean value that is true if the user has no Applications yet.
   */
  readonly isDataEmpty: boolean;

  /**
   * A method that A-Z sort the rows by the selected column id.
   */
  onColumnSort: (id: string) => void;

  /**
   * A method that toggles the column selector modal.
   */
  onToggleModal: () => void;

  /**
   * A method that initiates a `GET` REST API operation to refetch the user's Application records.
   */
  onRefetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;

  /**
   * A boolean value controlling the pop-up toast's visibility.
   */
  readonly shouldToastVisible: boolean;

  /**
   * A callback method that manages popping up the download .pdf request toast.
   */
  onDownloadPdfRequest: () => void;
}

/**
 * Renders the table header row on the Applications table page. A number of buttons are rendered in the component as well, such as
 * row ordering, .pdf report downloading, data refresh or modal pop-up buttons.
 *
 * @return {JSX.Element}
 */
export const TableHeader = ({
  columns,
  isDataEmpty,
  onColumnSort,
  onToggleModal,
  onRefetch,
  shouldToastVisible,
  onDownloadPdfRequest,
}: ComponentProps): JSX.Element => {
  const { mutate, isPending, isError, error } = useRequestPdfDownload(onDownloadPdfRequest);

  if (isError) {
    let errorMessage = '';

    if (axios.isAxiosError(error)) {
      errorMessage = errorConstants.UNEXPECTED_SERVER_ERROR;
    } else {
      errorMessage = errorConstants.UNEXPECTED_GLOBAL_ERROR;
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
                  disabled={isDataEmpty}
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
            disabled={isDataEmpty}
          >
            Refresh
            <FontAwesomeIcon icon={iconLibraryConfig.faRotateRight} />
          </button>
          <button
            type={'button'}
            onClick={onToggleModal}
            disabled={isDataEmpty}
          >
            Display
            <FontAwesomeIcon icon={iconLibraryConfig.faTable} />
          </button>
          {isPending || shouldToastVisible ? (
            <LoadingIndicator loadingText={constants.ui.download.REQUEST} />
          ) : (
            <button
              type={'button'}
              onClick={() => mutate()}
              disabled={isDataEmpty}
            >
              Download
              <FontAwesomeIcon icon={iconLibraryConfig.faFileArrowDown} />
            </button>
          )}
        </th>
      </TableHeadRow>
    </>
  );
};
