import { AxiosError } from 'axios';

import { useGetApplications } from '@hooks/application/index.ts';
import {
  useDisplayColumnSelectorModal,
  useSetColumns,
  useSetOrder,
} from './Applications.hooks.tsx';

import {
  ColumnSelectorModal,
  DataRows,
  TableHead,
} from './components';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import { Main } from './Applications.styles.ts';

import { ApplicationT } from '@services/application/application.service.ts';

const Applications = () => {
  const { data, isLoading, refetch, isRefetching, isError, error } = useGetApplications();
  const { columns, updateColumnVisibility } = useSetColumns();
  const { handleColumnSort } = useSetOrder(data as ApplicationT[]);
  const { isModalVisible, toggleModal } = useDisplayColumnSelectorModal();

  if (isLoading || isRefetching) {
    return <GlobalLoadingModal content={'The application is fetching your data...'} />;
  }

  if (isError && error instanceof AxiosError) {
    return <GlobalErrorModal content={error.response?.data.root} />;
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
          {data && <DataRows columns={columns} data={data} />}
        </tbody>
      </table>
      {isModalVisible &&
        <ColumnSelectorModal
          columns={columns}
          handleColumnVisibility={updateColumnVisibility}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />}
    </Main>
  );
};

export default Applications;
