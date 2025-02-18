/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

/* component, style imports */
import { Cell, TableBodyRow } from './data-rows.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { constants } from './data-rows.constants';
import { isColumnVisible } from './data-rows.utilities';

/* interface, type, enum imports */
import { Application } from '@common-types';
import { Column } from '../../applications.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * An array of columns configuration, defining which columns should be displayed.
   */
  readonly columns: Array<Column>;

  /**
   * An array of Application records to be displayed in the table rows.
   */
  readonly applications: Array<Application>;
}

/**
 * Renders a {@link Cell} component for each data element in the Applications record array.
 *
 * @return {Array<JSX.Element>}
 */
export const DataRows = ({ columns, applications }: ComponentProps): Array<JSX.Element> => {
  return applications.map((application: Application) => {
    return (
      <TableBodyRow key={application.uuid}>
        <Cell $shouldDisplay={isColumnVisible(columns, 'courseName')}>{application.courseName}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'university')}>{application.university}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'country')}>{application.country}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'programmeLength')}>{application.programmeLength}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'applicationStatus')}>{application.applicationStatus.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'interviewStatus')}>{application.interviewStatus?.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'offerStatus')}>{application.offerStatus?.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'responseStatus')}>{application.responseStatus?.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'finalDestinationStatus')}>{application.finalDestinationStatus?.name ?? '-'}</Cell>
        <td>
          <Link
            to={`edit/${application.uuid}`}
            state={application}
          >
            {constants.ui.EDIT}
            <FontAwesomeIcon icon={iconLibraryConfig.faWrench} />
          </Link>
          <Link
            to={`view/${application.uuid}`}
            state={application}
          >
            {constants.ui.VIEW}
            <FontAwesomeIcon icon={iconLibraryConfig.faMagnifyingGlass} />
          </Link>
        </td>
      </TableBodyRow>
    );
  });
};
