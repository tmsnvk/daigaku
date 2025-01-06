/**
 * @prettier
 */

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
import { useColumnVisibility, useSortOrder } from './applications.hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './applications.styles';
import { ColumnSelectorModal, DataRows, TableHeader } from './components';

/* configuration, utilities, constants imports */
import { errorConstants } from '@constants';
import { constants } from './applications.constants';

/* interface, type, enum imports */
import { Application } from '@common-types';

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
  const { isModalVisible, toggleModal } = useModalToggle();

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
            onColumnSort={handleColumnSort}
            onToggleModal={toggleModal}
            onRefetch={refetch}
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
    </Main>
  );
};
