import {
  FigureInfoBox,
  TextInfoBox,
} from '../../components';
import { DashboardDataT } from '../../Dashboard.hooks.tsx';
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
          country={data.firmChoiceDto.country ?? ''}
          university={data.firmChoiceDto.university ?? 'Not yet selected.'}
          courseName={data.firmChoiceDto.courseName ?? ''}
        />
        <TextInfoBox
          title={finalDestination}
          country={data.finalDestinationDto.country ?? ''}
          university={data.finalDestinationDto.university ?? 'Not yet selected.'}
          courseName={data.finalDestinationDto.courseName ?? ''}
        />
      </section>
    </>
  );
};

export default StudentLayout;
