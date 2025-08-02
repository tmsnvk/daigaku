/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface ApplicationMetadataProps {
  /**
   *
   */
  readonly metadata: {
    created: {
      createdAt: Date;
      createdBy: string;
    };
    lastUpdated: {
      lastUpdatedAt: Date;
      lastModifiedBy: string;
    };
  };

  /**
   * Additional style options.
   */
  readonly className?: string;
}

/**
 * Renders the metadata details for the selected application.
 *
 * @param {ApplicationMetadataProps} props
 * @return {JSX.Element}
 */
export const ApplicationMetadata = ({ metadata, className }: ApplicationMetadataProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={joinTw('text-2xl', className)}>
      <dl>
        <div>
          <dt className={'inline-block font-extrabold'}>{t('app.domain.application.submittedAt')}</dt>{' '}
          <dd className={'inline-block'}>
            {new Date(metadata.created.createdAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </dd>
        </div>
        <div className={'my-2'}>
          <dt className={'inline-block font-extrabold'}>{t('app.domain.application.submittedBy')}</dt>{' '}
          <dd className={'inline-block'}>{metadata.created.createdBy}</dd>
        </div>
        <div className={'my-2'}>
          <dt className={'inline-block font-extrabold'}>{t('app.domain.application.lastUpdatedAt')}</dt>{' '}
          <dd className={'inline-block'}>
            {new Date(metadata.lastUpdated.lastUpdatedAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </dd>
        </div>
        <div>
          <dt className={'inline-block font-extrabold'}>{t('app.domain.application.lastModifiedBy')}</dt>{' '}
          <dd className={'inline-block'}>{metadata.lastUpdated.lastModifiedBy}</dd>
        </div>
      </dl>
    </article>
  );
};
