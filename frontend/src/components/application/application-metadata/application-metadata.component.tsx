/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { BaseMetadata } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps extends BaseMetadata {
  /**
   *
   */
  readonly gridPosition: string;
}

/**
 * Renders the metadata for a selected application, including the creation and
 * last-updated timestamps, as well as the respective users responsible for these actions.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const ApplicationMetadata = ({ gridPosition, createdAt, createdBy, lastUpdatedAt, lastModifiedBy }: ComponentProps): JSX.Element => {
  return (
    <article className={`grid ${gridPosition} mr-auto text-2xl`}>
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
        <div className={'my-[0.5rem]'}>
          <dt className={'inline-block font-extrabold'}>{l.APPLICATION.METADATA.SUBMISSION.BY}</dt>{' '}
          <dd className={'inline-block'}>{createdBy}</dd>
        </div>
        <div className={'my-[0.5rem]'}>
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
