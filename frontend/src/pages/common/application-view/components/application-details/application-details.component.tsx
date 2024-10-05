/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { Link } from 'react-router-dom';

/* component, style imports */
import { ApplicationMetadata } from '@components/application';
import { PageTitle } from '@components/general';
import { ApplicationDetail } from '../application-detail';
import { Section } from './application-details.styles';

/* configuration, utilities, constants imports */
import { constants } from './application-details.constants';

/* interface, type, enum imports */
import { Application } from '@common-types';

/**
 * ===============
 * Component {@link ApplicationDetails}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  application: Application;
}

/**
 * @description
 * The component renders the details of a single application.
 *
 * @param {Application} props.application
 * The selected {@link Application} object.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ApplicationDetails = ({ application }: ComponentProps): JSX.Element => {
  return (
    <Section as={'section'}>
      <PageTitle title={constants.ui.TITLE} />
      <ApplicationMetadata
        createdAt={application.createdAt}
        createdBy={application.createdBy}
        lastUpdatedAt={application.lastUpdatedAt}
        lastModifiedBy={application.lastModifiedBy}
      />
      <article>
        <Link to={`/applications/edit/${application.uuid}`}>{constants.ui.EDIT_BUTTON}</Link>
      </article>
      <ApplicationDetail
        name={constants.fields.country.NAME}
        value={application.country}
      />
      <ApplicationDetail
        name={constants.fields.courseName.NAME}
        value={application.courseName}
      />
      <ApplicationDetail
        name={constants.fields.minorSubject.NAME}
        value={application.minorSubject ?? '-'}
      />
      <ApplicationDetail
        name={constants.fields.programmeLength.NAME}
        value={application.programmeLength}
      />
      <ApplicationDetail
        name={constants.fields.applicationStatus.NAME}
        value={application.applicationStatus}
      />
      <ApplicationDetail
        name={constants.fields.interviewStatus.NAME}
        value={application.interviewStatus}
      />
      <ApplicationDetail
        name={constants.fields.offerStatus.NAME}
        value={application.offerStatus}
      />
      <ApplicationDetail
        name={constants.fields.responseStatus.NAME}
        value={application.responseStatus}
      />
      <ApplicationDetail
        name={constants.fields.finalDestination.NAME}
        value={application.finalDestinationStatus}
      />
    </Section>
  );
};
