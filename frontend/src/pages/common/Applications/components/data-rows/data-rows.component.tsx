/**
 * @prettier
 */

/* external imports */
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* component, style imports */
import { Cell, TableBodyRow } from './data-rows.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* utilities imports */
import { isColumnFound } from './data-rows.utilities';

/* interface, type, enum imports */
import { Column } from '../../aapplications.hooks';
import { Application } from '@common-types';

/* interfaces, types, enums */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly data: Array<Application>;
}

/*
 * component - TODO - add functionality description
 */
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
        <Cell $shouldDisplay={isColumnFound(columns, 'finalDestinationStatus')}>{application.finalDestinationStatus ?? '-'}</Cell>
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
