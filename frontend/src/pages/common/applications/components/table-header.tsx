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
import { useRequestPdfDownload } from '../hooks';

/* component imports */
import { CoreButton } from '@daigaku/components/core';
import { LoadingIndicator } from '@daigaku/components/general';
import { GlobalErrorModal } from '@daigaku/components/notification';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { errorConstants, localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { Column } from '../models';

/**
 * Defines the component's properties.
 */
interface TableHeaderProps {
  /**
   * The list of columns that should be displayed by the component.
   */
  readonly columns: Array<Column>;

  /**
   * The boolean value that is true if the user has no Applications yet.
   */
  readonly isDataEmpty: boolean;

  /**
   * The method sorting A-Z t the rows by the selected column id.
   */
  onColumnSort: (id: string) => void;

  /**
   * The method toggling the column selector modal.
   */
  onToggleModal: () => void;

  /**
   * The method initiating a `GET` REST API operation to refetch the user's application records.
   */
  onRefetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;

  /**
   * The boolean value controlling the pop-up toast component's visibility.
   */
  readonly isToastVisible: boolean;

  /**
   * The method managing popping up the download .pdf request toast component.
   */
  onDownloadPdfRequest: () => void;
}

/**
 * Renders the table header row on the /applications url. A number of buttons are rendered in the component as well,
 * such as row ordering, .pdf report downloading, data refresh or modal pop-up buttons.
 *
 * @return {JSX.Element}
 */
export const TableHeader = ({
  columns,
  isDataEmpty,
  onColumnSort,
  onToggleModal,
  onRefetch,
  isToastVisible,
  onDownloadPdfRequest,
}: TableHeaderProps): JSX.Element => {
  const { mutate, isPending, isError, error } = useRequestPdfDownload(onDownloadPdfRequest);

  if (isError) {
    let errorMessage;

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
    <tr>
      {columns.map((column: Column) => {
        return (
          column.isVisible && (
            <th
              key={column.id}
              className={joinTw('text-center', 'w-[10%]', 'px-4 py-6')}
            >
              <CoreButton
                label={column.name}
                content={
                  <>
                    {column.name}
                    <FontAwesomeIcon
                      icon={iconLibraryConfig.faSort}
                      className={joinTw('ml-2')}
                    />
                  </>
                }
                intent={'table'}
                onClick={() => onColumnSort(column.id)}
                disabled={isDataEmpty}
              />
            </th>
          )
        );
      })}
      <th className={joinTw('text-center', 'w-[10%]', 'px-1 py-6')}>
        <CoreButton
          label={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.BUTTONS.REFRESH}
          content={
            <>
              {l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.BUTTONS.REFRESH}
              <FontAwesomeIcon
                icon={iconLibraryConfig.faRotateRight}
                className={joinTw('ml-2')}
              />
            </>
          }
          intent={'table'}
          onClick={() => onRefetch({ cancelRefetch: false })}
          disabled={isDataEmpty}
        />
        <CoreButton
          label={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.BUTTONS.DISPLAY}
          content={
            <>
              {l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.BUTTONS.DISPLAY}
              <FontAwesomeIcon
                icon={iconLibraryConfig.faTable}
                className={joinTw('ml-2')}
              />
            </>
          }
          intent={'table'}
          onClick={onToggleModal}
          disabled={isDataEmpty}
        />
        {isPending || isToastVisible ? (
          <LoadingIndicator loadingText={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.DOWNLOAD.REQUEST} />
        ) : (
          <CoreButton
            label={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.BUTTONS.DOWNLOAD}
            content={
              <>
                {l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.BUTTONS.DOWNLOAD}
                <FontAwesomeIcon
                  icon={iconLibraryConfig.faFileArrowDown}
                  className={joinTw('ml-2')}
                />
              </>
            }
            intent={'table'}
            onClick={() => mutate()}
            disabled={isDataEmpty}
          />
        )}
      </th>
    </tr>
  );
};
