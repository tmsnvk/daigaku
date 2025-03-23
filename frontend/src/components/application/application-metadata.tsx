/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { joinTw } from '@utilities';

/* interface, type, enum imports */
import { BaseMetadata } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ApplicationMetadataProps extends BaseMetadata {
  /**
   * Additional optional styling options.
   */
  readonly className?: string;
}

/**
 * Renders the metadata for a selected application record.
 *
 * @param {ApplicationMetadataProps} props
 * @return {JSX.Element}
 */
export const ApplicationMetadata = ({
  className,
  createdAt,
  createdBy,
  lastUpdatedAt,
  lastModifiedBy,
}: ApplicationMetadataProps): JSX.Element => {
  return (
    <article className={joinTw('text-2xl', className)}>
      <dl>
        <div>
          <dt className={'inline-block font-extrabold'}>{l.APPLICATION.METADATA.SUBMISSION.AT}</dt>{' '}
          <dd className={'inline-block'}>
            {new Date(createdAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </dd>
        </div>
        <div className={'my-2'}>
          <dt className={'inline-block font-extrabold'}>{l.APPLICATION.METADATA.SUBMISSION.BY}</dt>{' '}
          <dd className={'inline-block'}>{createdBy}</dd>
        </div>
        <div className={'my-2'}>
          <dt className={'inline-block font-extrabold'}>{l.APPLICATION.METADATA.LAST_UPDATE.AT}</dt>{' '}
          <dd className={'inline-block'}>
            {new Date(lastUpdatedAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </dd>
        </div>
        <div>
          <dt className={'inline-block font-extrabold'}>{l.APPLICATION.METADATA.LAST_UPDATE.BY}</dt>{' '}
          <dd className={'inline-block'}>{lastModifiedBy}</dd>
        </div>
      </dl>
    </article>
  );
};
