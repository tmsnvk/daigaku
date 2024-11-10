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
import { constants } from './data-rows.constants';

/**
 * ===============
 * Component {@link DataRows}
 * ===============
 */

/**
 * Defines the properties of the {@link DataRows} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * An array of columns configuration, defining which columns should be displayed.
   */
  readonly columns: Array<Column>;

  /**
   * An array of {@link Application} objects to be displayed in the table rows.
   */
  readonly applications: Array<Application>;
}

/**
 * Renders a {@link Cell} component for each data element in the applications array.
 *
 * @return {Array<JSX.Element>}
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
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'applicationStatus')}>{application.applicationStatus.name ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'interviewStatus')}>{application.interviewStatus.name ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'offerStatus')}>{application.offerStatus.name ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'responseStatus')}>{application.responseStatus.name ?? '-'}</Cell>
        <Cell $shouldDisplay={shouldColumnBeVisible(columns, 'finalDestinationStatus')}>
          {application.finalDestinationStatus.name ?? '-'}
        </Cell>
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
