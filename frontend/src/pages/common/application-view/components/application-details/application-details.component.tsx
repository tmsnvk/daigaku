import {
  LoadingIndicator,
  PageTitle,
} from '@components/general';
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
    </ApplicationSection>
  );
};

export default ApplicationDetails;
