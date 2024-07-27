import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  DataCell,
  TableBodyRow,
} from './data-rows.styles';

import { iconLibraryConfig } from '@configuration';
import { isColumnFound } from './data-rows.utilities';

import { Column } from '../../applications.hooks';
import { ApplicationData } from '@services/application/application.service';

interface ComponentProps {
  readonly columns: Array<Column>;
  readonly data: Array<ApplicationData>;
}

const DataRows = ({ columns, data }: ComponentProps) => {
  return (
    data.map((element) => {
      return (
        <TableBodyRow key={element.uuid}>
          <DataCell $shouldDisplay={isColumnFound(columns, 'courseName')}>{element.courseName}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'university')}>{element.university}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'country')}>{element.country}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'applicationStatus') }>{element.applicationStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'interviewStatus')}>{element.interviewStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'offerStatus')}>{element.offerStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'responseStatus')}>{element.responseStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={isColumnFound(columns, 'finalDestinationStatus')}>{element.finalDestinationStatus ?? '-'}</DataCell>
          <td>
            <Link
              to={element.uuid}
              state={element}
            >
              EDIT
              <FontAwesomeIcon
                icon={iconLibraryConfig.faWrench}
              />
            </Link>
          </td>
        </TableBodyRow>
      );
    })
  );
};

export default DataRows;
