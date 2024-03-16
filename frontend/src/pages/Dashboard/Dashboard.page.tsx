import { useGetDashboardData } from './Dashboard.hooks.tsx';
import {
  FigureInfoBox,
  FinalDestinationInfoBox,
} from '@components/page/dashboard';
import { GlobalLoadingModal } from '@components/shared/modal';
import { MainContainer } from './Dashboard.styles.ts';
import {
  finalDestination,
  numberOfApplications,
  numberOfDifferentCountries,
  numberOfDifferentUniversities,
  numberOfOffers,
  numberOfPlannedStatus,
  numberOfSubmittedStatus,
  numberOfWithdrawnStatus,
} from './Dashboard.utilities.ts';

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
            title={numberOfApplications}
            content={data.numberOfApplications}
          />
          <FigureInfoBox
            title={numberOfPlannedStatus}
            content={data.numberOfPlannedStatus}
          />
          <FigureInfoBox
            title={numberOfSubmittedStatus}
            content={data.numberOfSubmittedStatus}
          />
          <FigureInfoBox
            title={numberOfWithdrawnStatus}
            content={data.numberOfWithdrawnStatus}
          />
        </section>
        <section>
          <FigureInfoBox
            title={numberOfDifferentCountries}
            content={data.numberOfDifferentCountries}
          />
          <FigureInfoBox
            title={numberOfDifferentUniversities}
            content={data.numberOfDifferentUniversities}
          />
        </section>
        <section>
          <FigureInfoBox
            title={numberOfOffers}
            content={data.numberOfOffers}
          />
          <FinalDestinationInfoBox
            title={finalDestination}
            country={data.finalDestinationCountry ?? ''}
            university={data.finalDestinationUniversity ?? 'Not yet selected.'}
            courseName={data.finalDestinationCourseName ?? ''}
          />
        </section>
      </MainContainer>
  );
};

export default DashboardPage;
