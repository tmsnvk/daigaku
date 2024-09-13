/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

/* logic imports */
import { RequestPdfDownload, useRequestPdfDownload } from './table-header.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, Toast } from '@components/notification';
import { TableHeadRow } from './table-header.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { Column } from '../../applications.hooks';
import { constants } from './table-header.constants';

/**
 * ===============
 * Component {@link TableHeader}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly onColumnSort: (id: string) => void;
  readonly onToggleModal: () => void;
  readonly onRefetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;
}

/**
 * @description
 * The component renders the table header row on the Applications page. A number of buttons are rendered in the component as well, such as
 * row ordering, .pdf report downloading, data refresh or modal pop-up buttons.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
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
            <LoadingIndicator loadingText={constants.uiMessage.DOWNLOAD_REQUEST} />
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
        message={constants.uiMessage.DOWNLOAD_TOAST}
      />
    </>
  );
};
