import { useGetApplicationsByStudent } from '@hooks/applications';
import {
  useSetColumns,
  useShowColumnDisplayModal,
} from './Applications.hooks.tsx';
import {
  ColumnSelectorButton,
  ColumnSelectorModal,
  DataRows,
} from 'components/page/applications';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { MainContainer } from './Applications.styles.ts';

const ApplicationsPage = () => {
  const { data, isLoading, isError } = useGetApplicationsByStudent();
  const { columns, updateColumnVisibility } = useSetColumns();
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
            {columns.map((element) => {
              return element.isActive && <th key={element.id}>{element.name}</th>;
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
