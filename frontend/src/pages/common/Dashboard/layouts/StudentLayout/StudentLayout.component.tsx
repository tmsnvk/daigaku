import {
  FigureInfoBox,
  TextInfoBox,
} from '../../components';

import { DashboardDataT } from '../../Dashboard.hooks.tsx';

type ComponentPropsT = {
  data: DashboardDataT
};

const StudentLayout = ({ data }: ComponentPropsT) => {
  return (
    <>
      <section>
        <FigureInfoBox
          title={'Applications'}
          content={data.numberOfApplications}
        />
        <FigureInfoBox
          title={'Planned Applications'}
          content={data.numberOfPlannedStatus}
        />
        <FigureInfoBox
          title={'Submitted Applications'}
          content={data.numberOfSubmittedStatus}
        />
        <FigureInfoBox
          title={'Withdrawn Applications'}
          content={data.numberOfWithdrawnStatus}
        />
      </section>
      <section>
        <FigureInfoBox
          title={'Distinct Countries'}
          content={data.numberOfDifferentCountries}
        />
        <FigureInfoBox
          title={'Distinct Universities'}
          content={data.numberOfDifferentUniversities}
        />
      </section>
      <section>
        <FigureInfoBox
          title={'Offers'}
          content={data.numberOfOffers}
        />
        {data.firmChoiceDto && <TextInfoBox
          title={'Firm Choice'}
          country={data.firmChoiceDto.country ?? ''}
          university={data.firmChoiceDto.university ?? 'Not yet selected.'}
          courseName={data.firmChoiceDto.courseName ?? ''}
        />}
        {data.finalDestinationDto && <TextInfoBox
          title={'Final Destination'}
          country={data.finalDestinationDto.country ?? ''}
          university={data.finalDestinationDto.university ?? 'Not yet selected.'}
          courseName={data.finalDestinationDto.courseName ?? ''}
        />}
      </section>
    </>
  );
};

export default StudentLayout;
