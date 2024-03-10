import { useGetApplications } from '@hooks/index.ts';
import { MainContainer } from './Dashboard.styles.ts';

const DashboardPage = () => {
  const { applicationData, isApplicationDataLoading, isApplicationDataError } = useGetApplications();

  return (
    <MainContainer>

    </MainContainer>
  );
};

export default DashboardPage;
