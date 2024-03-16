import { useGetDashboardData } from './Dashboard.hooks.tsx';
import { FigureInfoBox } from '@components/page/dashboard';
import { GlobalLoadingModal } from '@components/shared/modal';
import { MainContainer } from './Dashboard.styles.ts';

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboardData();

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  return (
    <MainContainer>
      <FigureInfoBox
        
      />
    </MainContainer>
  );
};

export default DashboardPage;
