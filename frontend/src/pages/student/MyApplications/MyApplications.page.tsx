import { useGetApplicationsByStudent } from '@hooks/applications';
import {
  useSetColumns,
  useShowColumnDisplayModal,
} from './MyApplications.hooks.tsx';
import {
  ColumnSelectorButton,
  ColumnSelectorModal,
} from '@components/page/my-applications';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { MainContainer } from './MyApplications.styles.ts';

const MyApplicationsPage = () => {
  const { data, isLoading, isError } = useGetApplicationsByStudent();
  const { columns, updateColumnVisibility } = useSetColumns();
  const { isModalVisible, toggleModal } = useShowColumnDisplayModal();

  console.log(data);

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

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
          {data && data.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.country}</td>
                <td>{element.university}</td>
                <td>{element.courseName}</td>
                <td><button type={'submit'}>EDIT</button></td>
              </tr>
            );
          })}
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

export default MyApplicationsPage;
