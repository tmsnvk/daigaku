/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { getStatusDisplayValue, joinTw } from '@daigaku/utilities';

/* component imports */
import { CoreLink } from '@daigaku/components/common/core';
import { CoreFormHeader } from '@daigaku/components/common/form';
import { ApplicationMetadata } from '@daigaku/components/common/general';
import { ApplicationDetail } from './application-detail.tsx';

/* interface, type imports */
import {
  Application,
  ApplicationStatusTranslations,
  FinalDestinationStatusTranslations,
  InterviewStatusTranslations,
  OfferStatusTranslations,
  ResponseStatusTranslations,
} from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface ApplicationDetailsProps {
  /**
   * The selected application record.
   */
  readonly application: Application;
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
    <section className={joinTw('core-primary-border application-grid w-9/10 h-fit', '2xl:w-6/10')}>
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
        className={'col-start-1 col-end-3 text-center'}
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
        className={'col-start-1 col-end-2'}
      />
      <article className={'col-start-2 col-end-3'}>
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
        value={getStatusDisplayValue(ApplicationStatusTranslations, application.applicationStatus, t) ?? '-'}
      />
      <ApplicationDetail
        name={t('interviewStatusLabel')}
        value={getStatusDisplayValue(InterviewStatusTranslations, application.interviewStatus, t) ?? '-'}
      />
      <ApplicationDetail
        name={t('offerStatusLabel')}
        value={getStatusDisplayValue(OfferStatusTranslations, application.offerStatus, t) ?? '-'}
      />
      <ApplicationDetail
        name={t('responseStatusLabel')}
        value={getStatusDisplayValue(ResponseStatusTranslations, application.responseStatus, t) ?? '-'}
      />
      <ApplicationDetail
        name={t('finalDestinationStatusLabel')}
        value={getStatusDisplayValue(FinalDestinationStatusTranslations, application.finalDestinationStatus, t) ?? '-'}
      />
    </section>
  );
};
