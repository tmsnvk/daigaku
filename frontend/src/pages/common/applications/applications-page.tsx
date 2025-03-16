/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { useGetApplications, useModalToggle } from '@hooks';
import { useColumnVisibility, useDisplayDownloadToast, useSortOrder } from './hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal, Toast } from '@components/notification';
import { ColumnSelectorModal, DataRows, TableHeader } from './components';

/* configuration, utilities, constants imports */
import { errorConstants, localization as l } from '@constants';
import { isEmpty } from '@utilities';

/* interface, type, enum imports */
import { Application } from '@common-types';

/**
 * Renders, in table format, the list of application records that the user has authorisation to view.
 * The component displays various buttons and components to interact with the loaded-in data as well.
 *
 * @return {JSX.Element}
 */
export const Applications = (): JSX.Element => {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isRefetching, isError } = useGetApplications();
  const { columns, toggleColumnVisibility } = useColumnVisibility();
  const { handleColumnSort } = useSortOrder(data as Array<Application>);
  const { isModalVisible, toggleModal } = useModalToggle();
  const { isToastVisible, displayDownloadToast, handleAnimationEnd } = useDisplayDownloadToast();

  if (isLoading || isRefetching) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading || isRefetching}
        loadingText={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.LOADING}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={errorConstants.UNEXPECTED_GLOBAL_ERROR}
        onCloseModal={() => {
          navigate('/');
        }}
      />
    );
  }

  // add student selector dropdown for mentors
  // add mentor and student selector dropdowns for admins
  return (
    <main className={'base-dark-border flex flex-col w-[95%] mx-auto my-[5%] text-xl'}>
      <table className={'table-fixed text-center'}>
        <thead>
          <TableHeader
            columns={columns}
            isDataEmpty={isEmpty(data)}
            onColumnSort={handleColumnSort}
            onToggleModal={toggleModal}
            onRefetch={refetch}
            isToastVisible={isToastVisible}
            onDownloadPdfRequest={displayDownloadToast}
          />
        </thead>
        <tbody>
          {data && (
            <DataRows
              columns={columns}
              applications={data}
            />
          )}
        </tbody>
      </table>
      {isModalVisible && (
        <ColumnSelectorModal
          columns={columns}
          onToggleColumnVisibility={toggleColumnVisibility}
          isModalVisible={isModalVisible}
          onToggle={toggleModal}
        />
      )}
      <Toast
        isVisible={isToastVisible}
        message={l.PAGES.COMMON.APPLICATIONS.TABLE_HEADER.DOWNLOAD.TOAST}
        onAnimationEnd={handleAnimationEnd}
      />
    </main>
  );
};
