import { Article } from './ApplicationMetaData.styles.ts';

type ComponentPropsT = {
  createdAt: Date;
  createdBy: string;
  lastUpdatedAt: Date;
  lastModifiedBy: string;
}

const ApplicationMetaData = ({
  createdAt,
  createdBy,
  lastUpdatedAt,
  lastModifiedBy,
}: ComponentPropsT) => {
  return (
    <Article>
      <dl>
        <div>
          <dt>Submitted at:</dt>
          {' '}
          <dd>{new Date(createdAt).toLocaleString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
          </dd>
        </div>
        <div>
          <dt>Submitted by:</dt>
          {' '}
          <dd>{createdBy}</dd>
        </div>
        <div>
          <dt>Last updated at:</dt>
          {' '}
          <dd>{new Date(lastUpdatedAt).toLocaleString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
          </dd>
        </div>
        <div>
          <dt>Last modified by:</dt>
          {' '}
          <dd>{lastModifiedBy}</dd>
        </div>
      </dl>
    </Article>
  );
};

export default ApplicationMetaData;
