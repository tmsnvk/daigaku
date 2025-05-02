/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreLink } from '@daigaku/components/core';
import { CoreFormHeader } from '@daigaku/components/form';
import { ApplicationMetadata } from '@daigaku/components/general';
import { ApplicationDetail } from './application-detail';

/* configuration, utilities, constants imports */
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
  const { t } = useTranslation();

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
          label={t('edit')}
          intent={'dark'}
          size={'normal'}
        />
      </article>
      <ApplicationDetail
        name={t('countryLabel')}
        value={application.country}
      />
      <ApplicationDetail
        name={t('courseNameLabel')}
        value={application.courseName}
      />
      <ApplicationDetail
        name={t('minorSubjectLabel')}
        value={application.minorSubject ?? '-'}
      />
      <ApplicationDetail
        name={t('programmeLengthLabel')}
        value={application.programmeLength}
      />
      <ApplicationDetail
        name={t('applicationStatusLabel')}
        value={application.applicationStatus.name}
      />
      <ApplicationDetail
        name={t('interviewStatusLabel')}
        value={application.interviewStatus?.name ?? '-'}
      />
      <ApplicationDetail
        name={t('offerStatusLabel')}
        value={application.offerStatus?.name ?? '-'}
      />
      <ApplicationDetail
        name={t('responseStatusLabel')}
        value={application.responseStatus?.name ?? '-'}
      />
      <ApplicationDetail
        name={t('finalDestinationStatusLabel')}
        value={application.finalDestinationStatus?.name ?? '-'}
      />
    </section>
  );
};
