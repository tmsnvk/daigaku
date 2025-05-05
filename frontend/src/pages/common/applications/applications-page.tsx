/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetApplications, useModalToggle } from '@daigaku/hooks';
import { useColumnVisibility, useDisplayDownloadToast, useSortOrder } from './hooks';

/* component imports */
import { GlobalErrorModal, LoadingModal, Toast } from '@daigaku/components/notification';
import { ColumnSelectorModal, DataRows, TableHeader } from './components';

/* configuration, utilities, constants imports */
import { isEmpty, joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Renders, in table format, the list of application records that the user has authorisation to view.
 * The component displays various buttons and components to interact with the loaded-in data as well.
 *
 * @return {JSX.Element}
 */
export const Applications = (): JSX.Element => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { columns, toggleColumnVisibility } = useColumnVisibility();

  const { data: applications, isLoading, refetch, isRefetching, isError } = useGetApplications();
  const { handleColumnSort } = useSortOrder(applications as Array<ApplicationRecord>);

  const { isModalVisible, toggleModal } = useModalToggle();
  const { isToastVisible, displayDownloadToast, handleAnimationEnd } = useDisplayDownloadToast();

  if (isLoading || isRefetching) {
    return (
      <LoadingModal
        isVisible={isLoading || isRefetching}
        status={t('dataCompilation')}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={t('unexpectedGlobalError')}
        onCloseModal={() => {
          navigate('/');
        }}
      />
    );
  }

  // add student selector dropdown for mentors
  // add mentor and student selector dropdowns for admins
  return (
    <main className={joinTw('core-primary-border', 'flex flex-col', 'w-[95%]', 'mx-auto my-[5%] text-xl')}>
      <table className={joinTw('table-fixed text-center')}>
        <thead>
          <TableHeader
            columns={columns}
            isDataEmpty={isEmpty(applications)}
            onColumnSort={handleColumnSort}
            onToggleModal={toggleModal}
            onRefetch={refetch}
            isToastVisible={isToastVisible}
            onDownloadPdfRequest={displayDownloadToast}
          />
        </thead>
        <tbody>
          {applications && (
            <DataRows
              columns={columns}
              applications={applications}
            />
          )}
        </tbody>
      </table>
      {isModalVisible && (
        <ColumnSelectorModal
          columns={columns}
          onToggleColumnVisibility={toggleColumnVisibility}
          isVisible={isModalVisible}
          onToggle={toggleModal}
        />
      )}
      <Toast
        isVisible={isToastVisible}
        message={t('applicationPdfDownloadToast')}
        onAnimationEnd={handleAnimationEnd}
      />
    </main>
  );
};
