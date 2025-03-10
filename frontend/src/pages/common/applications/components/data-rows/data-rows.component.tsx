/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

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
 * Renders a <td> element for each data element in the Applications record array.
 *
 * @return {Array<JSX.Element>}
 */
export const DataRows = ({ columns, applications }: ComponentProps): Array<JSX.Element> => {
  return applications.map((application: Application) => {
    return (
      <tr
        key={application.uuid}
        className={'h-[10rem] odd:bg-(--color-white-smoke)'}
      >
        <td className={`display: ${isColumnVisible(columns, 'courseName') ? '' : 'hidden'}`}>{application.courseName}</td>
        <td className={`${isColumnVisible(columns, 'university') ? '' : 'hidden'}`}>{application.university}</td>
        <td className={`${isColumnVisible(columns, 'country') ? '' : 'hidden'}`}>{application.country}</td>
        <td className={`${isColumnVisible(columns, 'programmeLength') ? '' : 'hidden'}`}>{application.programmeLength}</td>
        <td className={`${isColumnVisible(columns, 'applicationStatus') ? '' : 'hidden'}`}>{application.applicationStatus.name ?? '-'}</td>
        <td className={`${isColumnVisible(columns, 'interviewStatus') ? '' : 'hidden'}`}>{application.interviewStatus?.name ?? '-'}</td>
        <td className={`${isColumnVisible(columns, 'offerStatus') ? '' : 'hidden'}`}>{application.offerStatus?.name ?? '-'}</td>
        <td className={`${isColumnVisible(columns, 'responseStatus') ? '' : 'hidden'}`}>{application.responseStatus?.name ?? '-'}</td>
        <td className={`${isColumnVisible(columns, 'finalDestinationStatus') ? '' : 'hidden'}`}>
          {application.finalDestinationStatus?.name ?? '-'}
        </td>
        <td>
          <Link
            className={
              'flex flex-row justify-center items-center mx-auto py-[1rem] bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--accent)'
            }
            to={`edit/${application.uuid}`}
            state={application}
          >
            {l.PAGES.COMMON.APPLICATIONS.ROW_BUTTONS.EDIT}
            <FontAwesomeIcon
              icon={iconLibraryConfig.faWrench}
              className={'ml-[1rem]'}
            />
          </Link>
          <Link
            className={
              'flex flex-row justify-center items-center mx-auto py-[1rem] bg-transparent text-(--color-dark-gun-metal) text-xl cursor-pointer hover:text-(--accent)'
            }
            to={`view/${application.uuid}`}
            state={application}
          >
            {l.PAGES.COMMON.APPLICATIONS.ROW_BUTTONS.VIEW}
            <FontAwesomeIcon
              icon={iconLibraryConfig.faMagnifyingGlass}
              className={'ml-[1rem]'}
            />
          </Link>
        </td>
      </tr>
    );
  });
};
