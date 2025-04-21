/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreLink } from '@daigaku/components/core';
import { CoreFormHeader } from '@daigaku/components/form';
import { ApplicationMetadata } from '@daigaku/components/general';
import { ApplicationDetail } from './application-detail';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface ApplicationDetailsProps {
  /**
   * The selected application record.
   */
  readonly application: ApplicationRecord;
}

/**
 * Renders the details of an application record.
 *
 * @param {ApplicationDetailsProps} props
 * @return {JSX.Element}
 */
export const ApplicationDetails = ({ application }: ApplicationDetailsProps): JSX.Element => {
  return (
    <section className={joinTw('core-primary-border application-grid', 'w-9/10 2xl:w-6/10 h-fit')}>
      <CoreFormHeader
        title={
          <>
            {application.university}
            <br />
            <br />
            {application.courseName}
          </>
        }
        intent={'large'}
        className={joinTw('col-start-1 col-end-3 text-center')}
      />
      <ApplicationMetadata
        metadata={{
          created: {
            createdAt: application.createdAt,
            createdBy: application.createdBy,
          },
          lastUpdated: {
            lastUpdatedAt: application.lastUpdatedAt,
            lastModifiedBy: application.lastModifiedBy,
          },
        }}
        className={joinTw('col-start-1 col-end-2')}
      />
      <article className={joinTw('col-start-2 col-end-3')}>
        <CoreLink
          target={`/applications/edit/${application.uuid}`}
          label={l.PAGES.COMMON.APPLICATION_VIEW.EDIT_BUTTON}
          intent={'dark'}
          size={'normal'}
        />
      </article>
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.COUNTRY.NAME}
        value={application.country}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.COURSE_NAME.NAME}
        value={application.courseName}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.MINOR_SUBJECT.NAME}
        value={application.minorSubject ?? '-'}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.PROGRAMME_LENGTH.NAME}
        value={application.programmeLength}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.APPLICATION_STATUS.NAME}
        value={application.applicationStatus.name}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.INTERVIEW_STATUS.NAME}
        value={application.interviewStatus?.name ?? '-'}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.OFFER_STATUS.NAME}
        value={application.offerStatus?.name ?? '-'}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.RESPONSE_STATUS.NAME}
        value={application.responseStatus?.name ?? '-'}
      />
      <ApplicationDetail
        name={l.PAGES.COMMON.APPLICATION_VIEW.FIELDS.FINAL_DESTINATION_STATUS.NAME}
        value={application.finalDestinationStatus?.name ?? '-'}
      />
    </section>
  );
};
