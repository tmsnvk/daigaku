/**
 * @prettier
 */

/* component, style imports */
import { FigureInfoBox, TextInfoBox } from '@pages/common/dashboard/components';

/* interface, type, enum imports */
import { DashboardData } from '../../dashboard.hooks';

/* interfaces, types, enums */
interface ComponentProps {
  readonly data: DashboardData;
}

/*
 * component - TODO - add functionality description
 */
export const StudentLayout = ({ data }: ComponentProps) => {
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
        {data.firmChoiceDto && (
          <TextInfoBox
            title={'Firm Choice'}
            country={data.firmChoiceDto.country ?? ''}
            university={data.firmChoiceDto.university ?? 'Not yet selected.'}
            courseName={data.firmChoiceDto.courseName ?? ''}
          />
        )}
        {data.finalDestinationDto && (
          <TextInfoBox
            title={'Final Destination'}
            country={data.finalDestinationDto.country ?? ''}
            university={data.finalDestinationDto.university ?? 'Not yet selected.'}
            courseName={data.finalDestinationDto.courseName ?? ''}
          />
        )}
      </section>
    </>
  );
};
