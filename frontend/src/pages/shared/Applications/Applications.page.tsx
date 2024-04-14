import { useGetApplications } from '@hooks';
import {
  useDisplayColumnSelectorModal,
  useSetColumns,
  useSetOrder,
} from './Applications.hooks.tsx';
import {
  ColumnSelectorModal,
  DataRows,
  TableHead,
} from '@components/page/applications';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/notification';
import { MainContainer } from './Applications.styles.ts';
import { ApplicationT } from '@services/application/application.service.ts';

const Applications = () => {
  const { data, isLoading, refetch, isRefetching, isError } = useGetApplications();
  const { columns, updateColumnVisibility } = useSetColumns();
  const { handleColumnSort } = useSetOrder(data?.data as ApplicationT[]);
  const { isModalVisible, toggleModal } = useDisplayColumnSelectorModal();

  if (isLoading || isRefetching) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  // add student selector dropdown for mentors
  // add mentor and student selector dropdowns for admins
  return (
    <MainContainer>
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
          {data && <DataRows columns={columns} data={data.data} />}
        </tbody>
      </table>
      {isModalVisible &&
        <ColumnSelectorModal
          columns={columns}
          handleColumnVisibility={updateColumnVisibility}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />}
    </MainContainer>
  );
};

export default Applications;
