import {
  FigureInfoBox,
  TextInfoBox,
} from '@components/page/dashboard/components';
import { DashboardDataT } from '@pages/shared/Dashboard/Dashboard.hooks.tsx';
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
        <TextInfoBox
          title={firmChoice}
          country={data.firmChoice.country ?? ''}
          university={data.firmChoice.university ?? 'Not yet selected.'}
          courseName={data.firmChoice.courseName ?? ''}
        />
        <TextInfoBox
          title={finalDestination}
          country={data.finalDestination.country ?? ''}
          university={data.finalDestination.university ?? 'Not yet selected.'}
          courseName={data.finalDestination.courseName ?? ''}
        />
      </section>
    </>
  );
};

export default StudentLayout;
