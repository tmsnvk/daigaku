/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Article } from './application-metadata.styles';

/* configuration, utilities, constants imports */
import { constants } from './application-metadata.constants';

/* interface, type, enum imports */
import { BaseMetadata } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps extends BaseMetadata {}

/**
 * Renders the metadata for a selected application, including the creation and
 * last update timestamps, as well as the respective users responsible for these actions.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const ApplicationMetadata = ({ createdAt, createdBy, lastUpdatedAt, lastModifiedBy }: ComponentProps): JSX.Element => {
  return (
    <Article>
      <dl>
        <div>
          <dt>{constants.ui.SUBMISSION.AT}</dt>{' '}
          <dd>
            {new Date(createdAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </dd>
        </div>
        <div>
          <dt>{constants.ui.SUBMISSION.BY}</dt> <dd>{createdBy}</dd>
        </div>
        <div>
          <dt>{constants.ui.LAST_UPDATE.AT}</dt>{' '}
          <dd>
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
          <dt>{constants.ui.LAST_UPDATE.BY}</dt> <dd>{lastModifiedBy}</dd>
        </div>
      </dl>
    </Article>
  );
};
