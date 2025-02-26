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

/* component imports */
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal } from '@components/notification';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { errorConstants, localization as l } from '@constants';

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
   * The boolean value that is true if the user has no Applications yet.
   */
  readonly isDataEmpty: boolean;

  /**
   * The method to A-Z sort the rows by the selected column id.
   */
  onColumnSort: (id: string) => void;

  /**
   * The method to toggle the column selector modal.
   */
  onToggleModal: () => void;

  /**
   * The method to initiate a `GET` REST API operation to refetch the user's application records.
   */
  onRefetch: (options: { cancelRefetch: boolean }) => Promise<UseQueryResult>;

  /**
   * The boolean value controlling the pop-up toast component's visibility.
   */
  readonly shouldToastVisible: boolean;

  /**
   * The method to manage popping up the download .pdf request toast component.
   */
  onDownloadPdfRequest: () => void;
}

/**
 * Renders the table header row on the /applications table page. A number of buttons are rendered in the component as well, such as
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
      <tr>
        {columns.map((column: Column) => {
          return (
            column.isVisible && (
              <th
                key={column.id}
                className={'w-[10%] px-[1rem] py-[2.5rem] text-center'}
              >
                <button
                  className={
                    'flex flex-row items-center mx-auto bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--color-indian-yellow) disabled:text-(--color-light-gray) disabled:cursor-not-allowed'
                  }
                  type={'button'}
                  onClick={() => onColumnSort(column.id)}
                  disabled={isDataEmpty}
                >
                  {column.name}
                  <FontAwesomeIcon
                    icon={iconLibraryConfig.faSort}
                    className={'inline-block ml-[1rem]'}
                  />
                </button>
              </th>
            )
          );
        })}
        <th className={'w-[10%] px-[1rem] py-[2.5rem] text-center'}>
          <button
            className={
              'h-[4rem] flex flex-row items-center mx-auto bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--color-indian-yellow) disabled:text-(--color-light-gray) disabled:cursor-not-allowed'
            }
            type={'button'}
            onClick={() => onRefetch({ cancelRefetch: false })}
            disabled={isDataEmpty}
          >
            Refresh
            <FontAwesomeIcon
              icon={iconLibraryConfig.faRotateRight}
              className={'inline-block ml-[1rem]'}
            />
          </button>
          <button
            className={
              'h-[4rem] flex flex-row items-center mx-auto bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--color-indian-yellow) disabled:text-(--color-light-gray) disabled:cursor-not-allowed'
            }
            type={'button'}
            onClick={onToggleModal}
            disabled={isDataEmpty}
          >
            Display
            <FontAwesomeIcon
              icon={iconLibraryConfig.faTable}
              className={'inline-block ml-[1rem]'}
            />
          </button>
          {isPending || shouldToastVisible ? (
            <LoadingIndicator loadingText={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.DOWNLOAD.REQUEST} />
          ) : (
            <button
              className={
                'h-[4rem] flex flex-row items-center mx-auto bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--color-indian-yellow) disabled:text-(--color-light-gray) disabled:cursor-not-allowed'
              }
              type={'button'}
              onClick={() => mutate()}
              disabled={isDataEmpty}
            >
              Download
              <FontAwesomeIcon
                icon={iconLibraryConfig.faFileArrowDown}
                className={'inline-block ml-[1rem]'}
              />
            </button>
          )}
        </th>
      </tr>
    </>
  );
};
