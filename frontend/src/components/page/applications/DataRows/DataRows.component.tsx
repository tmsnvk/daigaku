import {
  DataCell,
  RowContainer,
} from './DataRows.styles.ts';
import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';
import { ApplicationT } from '@hooks/applications/useGetApplications.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibraryConfig } from '@configuration';
import { Link } from 'react-router-dom';

type ComponentPropsT = {
  columns: ColumnT[];
  data: ApplicationT[];
}

const DataRows = ({ columns, data }: ComponentPropsT) => {
  return (
    data.map((element) => {
      return (
        <RowContainer key={element.id}>
          <DataCell $columns={columns} $id={'courseName'}>{element.courseName}</DataCell>
          <DataCell $columns={columns} $id={'university'}>{element.university}</DataCell>
          <DataCell $columns={columns} $id={'country'}>{element.country}</DataCell>
          <DataCell $columns={columns} $id={'applicationStatus'}>{element.applicationStatus ?? '-'}</DataCell>
          <DataCell $columns={columns} $id={'interviewStatus'}>{element.interviewStatus ?? '-'}</DataCell>
          <DataCell $columns={columns} $id={'offerStatus'}>{element.offerStatus ?? '-'}</DataCell>
          <DataCell $columns={columns} $id={'responseStatus'}>{element.responseStatus ?? '-'}</DataCell>
          <DataCell $columns={columns} $id={'finalDestinationStatus'}>{element.finalDestinationStatus ?? '-'}</DataCell>
          <td>
            <Link to={element.id}>
              EDIT
              <FontAwesomeIcon icon={iconLibraryConfig.faWrench} />
            </Link>
          </td>
        </RowContainer>
      );
    })
  );
};

export default DataRows;
