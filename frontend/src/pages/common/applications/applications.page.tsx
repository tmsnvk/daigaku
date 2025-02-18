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
import { useColumnVisibility, useDisplayDownloadToast, useSortOrder } from './applications.hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal, Toast } from '@components/notification';
import { Main } from './applications.styles';
import { ColumnSelectorModal, DataRows, TableHeader } from './components';

/* configuration, utilities, constants imports */
import { errorConstants } from '@constants';
import { constants } from './applications.constants';

/* interface, type, enum imports */
import { Application } from '@common-types';
import { isEmpty } from '@utilities';

/**
 * Renders, in a table format, the list of Application records that the user has authorisation to view.
 * The component displays a table with data rows as well as various buttons and components to interact with the loaded-in data.
 *
 * @return {JSX.Element}
 */
export const Applications = (): JSX.Element => {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isRefetching, isError } = useGetApplications();
  const { columns, toggleColumnVisibility } = useColumnVisibility();
  const { handleColumnSort } = useSortOrder(data as Array<Application>);
  const { isModalVisible: isToggleModalVisible, toggleModal } = useModalToggle();
  const { shouldToastVisible, displayDownloadToast, handleAnimationEnd } = useDisplayDownloadToast();

  if (isLoading || isRefetching) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading || isRefetching}
        loadingText={constants.ui.LOADING}
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
    <Main>
      <table>
        <thead>
          <TableHeader
            columns={columns}
            isDataEmpty={isEmpty(data)}
            onColumnSort={handleColumnSort}
            onToggleModal={toggleModal}
            onRefetch={refetch}
            shouldToastVisible={shouldToastVisible}
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
      {isToggleModalVisible && (
        <ColumnSelectorModal
          columns={columns}
          onToggleColumnVisibility={toggleColumnVisibility}
          isModalVisible={isToggleModalVisible}
          onToggle={toggleModal}
        />
      )}
      <Toast
        isVisible={shouldToastVisible}
        message={constants.ui.download.TOAST}
        onAnimationEnd={handleAnimationEnd}
      />
    </Main>
  );
};
