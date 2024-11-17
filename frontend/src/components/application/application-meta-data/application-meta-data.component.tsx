/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Article } from './application-meta-data.styles';

/**
 * ===============
 * Component {@link ApplicationMetadata}
 * ===============
 */

/**
 * Defines the properties for the {@link ApplicationMetadata} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The date and time when the application was initially created.
   */
  readonly createdAt: Date;

  /**
   *  The name of the user who created the application.
   */
  readonly createdBy: string;

  /**
   * The date and time when the application was last updated.
   */
  readonly lastUpdatedAt: Date;

  /**
   *  The name of the user who last modified the application.
   */
  readonly lastModifiedBy: string;
}

/**
 * Renders the metadata for a selected application, including the creation and
 * last update timestamps, as well as the respective users responsible for these actions.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
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
