import { PageTitle } from '@components/general';
import { ApplicationMetaData } from '@components/application';
import ApplicationDetailsField from '../application-details-field';
import { ApplicationSection } from './application-details.styles';

import { ApplicationData } from '@services/application/application.service';

interface ComponentProps {
  data: ApplicationData;
}

const ApplicationDetails = ({ data }: ComponentProps) => {
  return (
    <ApplicationSection as={'section'}>
      <PageTitle
        content={'View Application'}
      />
      <ApplicationMetaData
        createdAt={data.createdAt}
        createdBy={data.createdBy}
        lastUpdatedAt={data.lastUpdatedAt}
        lastModifiedBy={data.lastModifiedBy}
      />
      <ApplicationDetailsField
        name={'Country'}
        data={data.country}
      />
      <ApplicationDetailsField
        name={'Course'}
        data={data.courseName}
      />
      {data.minorSubject &&
        <ApplicationDetailsField
          name={'Minor'}
          data={data.minorSubject}
        />}
      <ApplicationDetailsField
        name={'Programme Length'}
        data={data.programmeLength}
      />
      <ApplicationDetailsField
        name={'Application Status'}
        data={data.applicationStatus}
      />
      <ApplicationDetailsField
        name={'Interview Status'}
        data={data.interviewStatus}
      />
      <ApplicationDetailsField
        name={'Offer Status'}
        data={data.offerStatus}
      />
      <ApplicationDetailsField
        name={'Response Status'}
        data={data.responseStatus}
      />
      <ApplicationDetailsField
        name={'Final Destination Status'}
        data={data.finalDestinationStatus}
      />
    </ApplicationSection>
  );
};

export default ApplicationDetails;
