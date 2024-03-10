import { useGetApplications } from '@hooks/index.ts';
import { MainContainer } from './Dashboard.styles.ts';
import { GlobalLoadingModal } from '@components/shared/modal';

const DashboardPage = () => {
  const { applicationData, isApplicationDataLoading, isApplicationDataError } = useGetApplications();

  if (isApplicationDataLoading) {
    return <GlobalLoadingModal />;
  }

  return (
    <MainContainer>

    </MainContainer>
  );
};

export default DashboardPage;
