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

/* component, style imports */
import { Article } from './application-meta-data.styles';

/**
 * ===============
 * Component {@link ApplicationMetadata}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly lastUpdatedAt: Date;
  readonly lastModifiedBy: string;
}

/**
 * @description
 * The component renders the metadata of a single selected application.
 *
 * @param createdAt
 * The date and time when the application was initially created.
 * @param createdBy
 * The name of the user who created the application.
 * @param lastUpdatedAt
 * The date and time when the application was last updated.
 * @param lastModifiedBy
 * The name of the user who last modified the application.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ApplicationMetadata = ({ createdAt, createdBy, lastUpdatedAt, lastModifiedBy }: ComponentProps): JSX.Element => {
  return (
    <Article>
      <dl>
        <div>
          <dt>Submitted at:</dt>{' '}
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
          <dt>Submitted by:</dt> <dd>{createdBy}</dd>
        </div>
        <div>
          <dt>Last updated at:</dt>{' '}
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
          <dt>Last modified by:</dt> <dd>{lastModifiedBy}</dd>
        </div>
      </dl>
    </Article>
  );
};
