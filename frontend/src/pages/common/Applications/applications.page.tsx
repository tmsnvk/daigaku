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
import { NavigateFunction, useNavigate } from 'react-router-dom';

/* logic imports */
import { useGetApplications, useModalToggle } from '@hooks/index';
import { ColumnVisibility, SetOrder, useColumnVisibility, useSortOrder } from './applications.hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './applications.styles';
import { ColumnSelectorModal, DataRows, TableHeader } from './components';

/* configuration, utilities, constants imports */
import { UNEXPECTED_GLOBAL_ERROR } from '@constants';
import { constants } from './applications.constants';

/* interface, type, enum imports */
import { Application, ListQueryResult } from '@common-types';
import { ModalToggle } from '@hooks/modal-components/use-modal-toggle';

/**
 * ===============
 * Component {@link Applications}
 * ===============
 */

/**
 * @description
 * The page-level component renders, in a table format, the list of applications that the user has authorisation to view.
 * The component displays a table with data rows as well as various buttons and components to interact with the loaded-in data.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const Applications = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { data, isLoading, refetch, isRefetching, isError }: ListQueryResult<Application> = useGetApplications();
  const { columns, toggleColumnVisibility }: ColumnVisibility = useColumnVisibility();
  const { handleColumnSort }: SetOrder = useSortOrder(data as Array<Application>);
  const { isModalVisible, toggleModal }: ModalToggle = useModalToggle();

  if (isLoading || isRefetching) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading || isRefetching}
        loadingText={constants.uiMessage.LOADING}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={UNEXPECTED_GLOBAL_ERROR}
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
