/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

/* component, style imports */
import { Cell, TableBodyRow } from './data-rows.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { shouldColumnBeVisible } from './data-rows.utilities';

/* interface, type, enum imports */
import { Application } from '@common-types';
import { Column } from '../../applications.hooks';

/**
 * ===============
 * Component {@link DataRows}
 * ===============
 */

/**
 * The interface represents the properties of the {@link DataRows} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly applications: Array<Application>;
}

/**
 * The component renders a {@link Cell} component for each data element in the applications array.
 * In addition, it appends an edit and a view buttons to the end of the row in table.
 *
 * @returns {Array<JSX.Element>}
 *
 * @since 0.0.1
 */
export const DataRows = ({ columns, applications }: ComponentProps): Array<JSX.Element> => {
  return applications.map((application: Application) => {
    return (
      <TableBodyRow key={application.uuid}>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'courseName')}>{application.courseName}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'university')}>{application.university}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'country')}>{application.country}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'applicationStatus')}>{application.applicationStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'interviewStatus')}>{application.interviewStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'offerStatus')}>{application.offerStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'responseStatus')}>{application.responseStatus ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'finalDestinationStatus')}>{application.finalDestinationStatus ?? '-'}</Cell>
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
