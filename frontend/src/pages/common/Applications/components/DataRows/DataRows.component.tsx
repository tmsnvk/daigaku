import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  DataCell,
  TableBodyRow,
} from './DataRows.styles.ts';

import { iconLibraryConfig } from '@configuration';
import { isColumnFound } from './DataRows.utilities.ts';

import { ColumnT } from '../../Applications.hooks.tsx';
import { ApplicationT } from '@services/application/application.service.ts';

type ComponentPropsT = {
  columns: ColumnT[];
  data: ApplicationT[];
}

const DataRows = ({ columns, data }: ComponentPropsT) => {
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
