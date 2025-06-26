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
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';
import { useRequestPdfDownload } from '../hooks/use-request-pdf-download.tsx';

/* component imports */
import { CoreButton } from '@daigaku/components/core';
import { LoadingIndicator } from '@daigaku/components/general';
import { GlobalErrorModal } from '@daigaku/components/notification';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/* interface, type imports */
import { Column } from '../../common/types.ts';

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
}: TableHeaderProps): JSX.Element => {
  const { t } = useTranslation();

  const { mutate: submitPdfDownloadRequest, isPending, isError, error } = useRequestPdfDownload();

  if (isError) {
    let errorMessage;

    if (axios.isAxiosError(error)) {
      errorMessage = t('unexpectedServerError');
    } else {
      errorMessage = t('unexpectedGlobalError');
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
                      icon={iconLibrary.faSort}
                      className={'ml-2'}
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
          label={t('refresh')}
          content={
            <>
              {t('refresh')}
              <FontAwesomeIcon
                icon={iconLibrary.faRotateRight}
                className={'ml-2'}
              />
            </>
          }
          intent={'table'}
          onClick={() => onRefetch({ cancelRefetch: false })}
          disabled={isDataEmpty}
        />
        <CoreButton
          label={t('display')}
          content={
            <>
              {t('display')}
              <FontAwesomeIcon
                icon={iconLibrary.faTable}
                className={'ml-2'}
              />
            </>
          }
          intent={'table'}
          onClick={onToggleModal}
          disabled={isDataEmpty}
        />
        {isPending ? (
          <LoadingIndicator loadingText={t('handlingRequest')} />
        ) : (
          <CoreButton
            label={t('download')}
            content={
              <>
                {t('download')}
                <FontAwesomeIcon
                  icon={iconLibrary.faFileArrowDown}
                  className={'ml-2'}
                />
              </>
            }
            intent={'table'}
            onClick={() => {
              submitPdfDownloadRequest();
            }}
            disabled={isDataEmpty}
          />
        )}
      </th>
    </tr>
  );
};
