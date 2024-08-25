/**
 * @prettier
 */

import { Article } from './application-meta-data.styles';

interface ComponentProps {
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly lastUpdatedAt: Date;
  readonly lastModifiedBy: string;
}

export const ApplicationMetaData = ({ createdAt, createdBy, lastUpdatedAt, lastModifiedBy }: ComponentProps) => {
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
