import { useGetApplications } from '@hooks/applications';
import {
  useSetColumns,
  useSetOrder,
  useShowColumnDisplayModal,
} from './Applications.hooks.tsx';
import {
  ColumnSelectorButton,
  ColumnSelectorModal,
  DataRows,
} from '@components/page/applications';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { GeneralIcon } from '@components/shared/icon-styles';
import { MainContainer } from './Applications.styles.ts';
import { iconLibraryConfig } from '@configuration';
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
          <tr>
            {columns.map((column) => {
              return (
                column.isActive &&
                <th key={column.id}>
                  {column.name}
                  <button type={'button'} onClick={() => handleColumnSort(column.id)}><GeneralIcon icon={iconLibraryConfig.faSort} /></button>
                </th>
              );
            })}
            <th><ColumnSelectorButton toggleModal={toggleModal} /></th>
          </tr>
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
