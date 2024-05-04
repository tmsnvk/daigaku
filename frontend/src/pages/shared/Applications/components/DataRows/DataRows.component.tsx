import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DataCell,
  TableBodyRow,
} from './DataRows.styles.ts';
import { iconLibraryConfig } from '@configuration';
import { ColumnT } from '../../Applications.hooks.tsx';
import { ApplicationT } from '@services/application/application.service.ts';
import { findColumn } from './DataRows.utilities.ts';

type ComponentPropsT = {
  columns: ColumnT[];
  data: ApplicationT[];
}

const DataRows = ({ columns, data }: ComponentPropsT) => {
  return (
    data.map((element) => {
      return (
        <TableBodyRow key={element.uuid}>
          <DataCell $shouldDisplay={findColumn(columns, 'courseName')}>{element.courseName}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'university')}>{element.university}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'country')}>{element.country}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'applicationStatus') }>{element.applicationStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'interviewStatus')}>{element.interviewStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'offerStatus')}>{element.offerStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'responseStatus')}>{element.responseStatus ?? '-'}</DataCell>
          <DataCell $shouldDisplay={findColumn(columns, 'finalDestinationStatus')}>{element.finalDestinationStatus ?? '-'}</DataCell>
          <td>
            <Link
              to={element.uuid}
              state={element}
            >
              EDIT
              <FontAwesomeIcon icon={iconLibraryConfig.faWrench} />
            </Link>
          </td>
        </TableBodyRow>
      );
    })
  );
};

export default DataRows;
