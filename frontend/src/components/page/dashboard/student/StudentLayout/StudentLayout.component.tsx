import {
  FigureInfoBox,
  TextInfoBoxInfoBox,
} from '@components/page/dashboard/components';
import { DashboardDataT } from '@pages/Dashboard/Dashboard.hooks.tsx';
import {
  finalDestination,
  firmChoice,
  numberOfApplications,
  numberOfDifferentCountries,
  numberOfDifferentUniversities,
  numberOfOffers,
  numberOfPlannedStatus,
  numberOfSubmittedStatus,
  numberOfWithdrawnStatus,
} from './StudentLayout.utilities.ts';

type ComponentPropsT = {
  data: DashboardDataT
};

const StudentLayout = ({ data }: ComponentPropsT) => {
  return (
    <>
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
        <TextInfoBoxInfoBox
          title={firmChoice}
          country={data.firmChoiceCountry ?? ''}
          university={data.firmChoiceUniversity ?? 'Not yet selected.'}
          courseName={data.firmChoiceCourseName ?? ''}
        />
        <TextInfoBoxInfoBox
          title={finalDestination}
          country={data.finalDestinationCountry ?? ''}
          university={data.finalDestinationUniversity ?? 'Not yet selected.'}
          courseName={data.finalDestinationCourseName ?? ''}
        />
      </section>
    </>
  );
};

export default StudentLayout;
