/**
 * @prettier
 */

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DataCell, TableBodyRow } from './data-rows.styles';

import { iconLibraryConfig } from '@configuration';
import { isColumnFound } from './data-rows.utilities';

import { Column } from '../../applications.hooks';
import { Application } from '@custom-types/index';

interface ComponentProps {
  readonly columns: Array<Column>;
  readonly data: Array<Application>;
}

export const DataRows = ({ columns, data }: ComponentProps) => {
  return data.map((element) => {
    return (
      <TableBodyRow key={element.uuid}>
        <DataCell $shouldDisplay={isColumnFound(columns, 'courseName')}>{element.courseName}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'university')}>{element.university}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'country')}>{element.country}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'applicationStatus')}>{element.applicationStatus ?? '-'}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'interviewStatus')}>{element.interviewStatus ?? '-'}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'offerStatus')}>{element.offerStatus ?? '-'}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'responseStatus')}>{element.responseStatus ?? '-'}</DataCell>
        <DataCell $shouldDisplay={isColumnFound(columns, 'finalDestinationStatus')}>{element.finalDestinationStatus ?? '-'}</DataCell>
        <td>
          <Link
            to={`edit/${element.uuid}`}
            state={element}
          >
            Edit
            <FontAwesomeIcon icon={iconLibraryConfig.faWrench} />
          </Link>
          <Link
            to={`view/${element.uuid}`}
            state={element}
          >
            View
            <FontAwesomeIcon icon={iconLibraryConfig.faMagnifyingGlass} />
          </Link>
        </td>
      </TableBodyRow>
    );
  });
};
