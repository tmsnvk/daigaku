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
import { localization as l } from '@constants';
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
   * An array of application records to be displayed in the table rows.
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
        <Cell $shouldDisplay={isColumnVisible(columns, 'university')}>{application.universityUuid}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'country')}>{application.countryUuid}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'programmeLength')}>{application.programmeLength}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'applicationStatus')}>{application.applicationStatus.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'interviewStatus')}>{application.interviewStatus?.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'offerStatus')}>{application.offerStatus?.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'responseStatus')}>{application.responseStatus?.name ?? '-'}</Cell>
        <Cell $shouldDisplay={isColumnVisible(columns, 'finalDestinationStatus')}>{application.finalDestinationStatus?.name ?? '-'}</Cell>
        <td>
          <Link
            className={
              'flex flex-row items-center mx-auto bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--color-indian-yellow)'
            }
            to={`edit/${application.uuid}`}
            state={application}
          >
            {l.PAGES.COMMON.APPLICATIONS.ROW_BUTTONS.EDIT}
            <FontAwesomeIcon icon={iconLibraryConfig.faWrench} />
          </Link>
          <Link
            className={
              'flex flex-row items-center mx-auto bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--color-indian-yellow)'
            }
            to={`view/${application.uuid}`}
            state={application}
          >
            {l.PAGES.COMMON.APPLICATIONS.ROW_BUTTONS.VIEW}
            <FontAwesomeIcon icon={iconLibraryConfig.faMagnifyingGlass} />
          </Link>
        </td>
      </TableBodyRow>
    );
  });
};
