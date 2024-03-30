import { useGetApplicationsByStudent } from '@hooks/applications';
import {
  useSetColumns,
  useShowColumnDisplayModal,
} from './Applications.hooks.tsx';
import {
  ColumnSelectorButton,
  ColumnSelectorModal,
} from '@components/page/my-applications';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { MainContainer } from './Applications.styles.ts';

const ApplicationsPage = () => {
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
                <td style={{ display: columns[0].isActive ? '' : 'none' }}>{element.courseName}</td>
                <td>{element.university}</td>
                <td>{element.country}</td>
                <td>{element.applicationStatus}</td>
                <td>{element.interviewStatus}</td>
                <td>{element.offerStatus}</td>
                <td>{element.responseStatus}</td>
                <td>{element.finalDestinationStatus}</td>
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

export default ApplicationsPage;
