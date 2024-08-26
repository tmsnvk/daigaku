/**
 * @prettier
 */

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Cell, TableBodyRow } from './data-rows.styles';

import { iconLibraryConfig } from '@configuration';
import { isColumnFound } from './data-rows.utilities';

import { Column } from '../../applications.hooks';
import { Application } from '@common-types';

interface ComponentProps {
  readonly columns: Array<Column>;
  readonly data: Array<Application>;
}

export const DataRows = ({ columns, data }: ComponentProps) => {
  return data.map((application: Application) => {
    return (
      <TableBodyRow key={application.uuid}>
        <Cell $shouldDisplay={isColumnFound(columns, 'courseName')}>{application.courseName}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'university')}>{application.university}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'country')}>{application.country}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'applicationStatus')}>{application.applicationStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'interviewStatus')}>{application.interviewStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'offerStatus')}>{application.offerStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'responseStatus')}>{application.responseStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnFound(columns, 'finalDestinationStatus')}>
          {application.finalDestinationStatus ?? '-'}
        </Cell>
        <td>
          <Link
            to={`edit/${application.uuid}`}
            state={application}
          >
            Edit
            <FontAwesomeIcon icon={iconLibraryConfig.faWrench} />
          </Link>
          <Link
            to={`view/${application.uuid}`}
            state={application}
          >
            View
            <FontAwesomeIcon icon={iconLibraryConfig.faMagnifyingGlass} />
          </Link>
        </td>
      </TableBodyRow>
    );
  });
};
