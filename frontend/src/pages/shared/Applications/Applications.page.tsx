import { useGetApplications } from '@hooks/applications';
import {
  useSetColumns,
  useSetOrder,
  useShowColumnDisplayModal,
} from './Applications.hooks.tsx';
import {
  ColumnSelectorModal,
  DataRows,
  TableHead,
} from '@components/page/applications';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { MainContainer } from './Applications.styles.ts';
import { ApplicationT } from '@hooks/applications/useGetApplications.tsx';

const ApplicationsPage = () => {
  const { data, isLoading, isError } = useGetApplications();
  const { columns, updateColumnVisibility } = useSetColumns();
  const { handleColumnSort } = useSetOrder(data as ApplicationT[]);
  const { isModalVisible, toggleModal } = useShowColumnDisplayModal();

  if (isLoading) {
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
            handleColumnSort={handleColumnSort}
            toggleModal={toggleModal}
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
    </MainContainer>
  );
};

export default ApplicationsPage;