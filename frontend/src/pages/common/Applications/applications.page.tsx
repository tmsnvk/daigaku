/**
 * @prettier
 */

/* external imports */
import { AxiosError } from 'axios';

/* logic imports */
import { useGetApplications } from '@hooks/application/index';
import {
  DisplayColumnSelectorModal,
  SetColumns,
  SetOrder,
  useDisplayColumnSelectorModal,
  useSetColumns,
  useSetOrder,
} from './applications.hooks.tsx';

/* component, style imports */
import { ColumnSelectorModal, DataRows, TableHead } from './components/index.ts';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './applications.styles.ts';

/* interface, type, enum imports */
import { Application, ListQueryResult } from '@common-types';

/*
 * component - TODO - add functionality description
 */
export const Applications = () => {
  const { data, isLoading, refetch, isRefetching, isError, error }: ListQueryResult<Application> = useGetApplications();
  const { columns, updateColumnVisibility }: SetColumns = useSetColumns();
  const { handleColumnSort }: SetOrder = useSetOrder(data as Array<Application>);
  const { isModalVisible, toggleModal }: DisplayColumnSelectorModal = useDisplayColumnSelectorModal();

  if (isLoading || isRefetching) {
    return <GlobalLoadingModal message={'The application is fetching your data...'} />;
  }

  if (isError && error instanceof AxiosError) {
    return <GlobalErrorModal message={error.response?.data.root} />;
  }

  // add student selector dropdown for mentors
  // add mentor and student selector dropdowns for admins
  return (
    <Main>
      <table>
        <thead>
          <TableHead
            columns={columns}
            columnSortHandler={handleColumnSort}
            toggleModalHandler={toggleModal}
            refetch={refetch}
          />
        </thead>
        <tbody>
          {data && (
            <DataRows
              columns={columns}
              data={data}
            />
          )}
        </tbody>
      </table>
      {isModalVisible && (
        <ColumnSelectorModal
          columns={columns}
          handleColumnVisibility={updateColumnVisibility}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
      )}
    </Main>
  );
};
