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
    data &&
      <MainContainer>
        <section>
          <FigureInfoBox
            title={'Number of Applications'}
            content={data.numberOfApplications}
          />
          <FigureInfoBox
            title={'Number of Planned Applications'}
            content={data.numberOfPlannedStatus}
          />
          <FigureInfoBox
            title={'Number of Submitted Applications'}
            content={data.numberOfSubmittedStatus}
          />
          <FigureInfoBox
            title={'Number of Applications'}
            content={data.numberOfApplications}
          />
        </section>
        <section>
          <FigureInfoBox
            title={'Number of Planned Applications'}
            content={data.numberOfPlannedStatus}
          />
          <FigureInfoBox
            title={'Number of Submitted Applications'}
            content={data.numberOfSubmittedStatus}
          />
        </section>
        <section>
          <FigureInfoBox
            title={'Number of Applications'}
            content={data.numberOfApplications}
          />
          <FigureInfoBox
            title={'Number of Planned Applications'}
            content={data.numberOfPlannedStatus}
          />
          <FigureInfoBox
            title={'Number of Submitted Applications'}
            content={data.numberOfSubmittedStatus}
          />
        </section>
      </MainContainer>
  );
};

export default DashboardPage;
