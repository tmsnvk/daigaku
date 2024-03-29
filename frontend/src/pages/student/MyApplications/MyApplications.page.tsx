import { useGetApplicationsByStudent } from '@hooks/applications';
import { MainContainer } from './MyApplications.styles.ts';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';

const MyApplicationsPage = () => {
  const { data, isLoading, isError } = useGetApplicationsByStudent();

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
            <th>Country</th>
            <th>University</th>
            <th>Course</th>
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
    </MainContainer>
  );
};

export default MyApplicationsPage;
