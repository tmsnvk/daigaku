/**
 * @prettier
 */

/* external imports */
import { Link } from 'react-router-dom';

/* component, style imports */
import { PageTitle } from '@components/general';
import { ApplicationMetaData } from '@components/application';
import { ApplicationDetailsField } from '../application-details-field';
import { ApplicationSection } from './application-details.styles';

/* interface, type, enum imports */
import { Application } from '@common-types';

/* interfaces, types, enums */
interface ComponentProps {
  application: Application;
}

/*
 * component - TODO - add functionality description
 */
export const ApplicationDetails = ({ application }: ComponentProps) => {
  return (
    <ApplicationSection as={'section'}>
      <PageTitle content={'View Application'} />
      <ApplicationMetaData
        createdAt={application.createdAt}
        createdBy={application.createdBy}
        lastUpdatedAt={application.lastUpdatedAt}
        lastModifiedBy={application.lastModifiedBy}
      />
      <article>
        <Link to={`/applications/edit/${application.uuid}`}>EDIT</Link>
      </article>
      <ApplicationDetailsField
        name={'Country'}
        applicationDetail={application.country}
      />
      <ApplicationDetailsField
        name={'Course'}
        applicationDetail={application.courseName}
      />
      {application.minorSubject && (
        <ApplicationDetailsField
          name={'Minor'}
          applicationDetail={application.minorSubject}
        />
      )}
      <ApplicationDetailsField
        name={'Programme Length'}
        applicationDetail={application.programmeLength}
      />
      <ApplicationDetailsField
        name={'Application Status'}
        applicationDetail={application.applicationStatus}
      />
      <ApplicationDetailsField
        name={'Interview Status'}
        applicationDetail={application.interviewStatus}
      />
      <ApplicationDetailsField
        name={'Offer Status'}
        applicationDetail={application.offerStatus}
      />
      <ApplicationDetailsField
        name={'Response Status'}
        applicationDetail={application.responseStatus}
      />
      <ApplicationDetailsField
        name={'Final Destination Status'}
        applicationDetail={application.finalDestinationStatus}
      />
    </ApplicationSection>
  );
};
