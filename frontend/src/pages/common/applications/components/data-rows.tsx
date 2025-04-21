/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* component imports */
import { CoreLink } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';
import { isColumnVisible } from '../utilities';

/* interface, type, enum imports */
import { ApplicationRecord } from '@daigaku/common-types';
import { Column } from '../models';

/**
 * Defines the component's properties.
 */
interface DataRowsProps {
  /**
   * An array of columns configuration, defining which columns should be displayed.
   */
  readonly columns: Array<Column>;

  /**
   * An array of application records to be displayed in the table rows.
   */
  readonly applications: Array<ApplicationRecord>;
}

/**
 * Renders a <tr> element for each data element in the applications record array.
 *
 * @return {Array<JSX.Element>}
 */
export const DataRows = ({ columns, applications }: DataRowsProps): Array<JSX.Element> => {
  return applications.map((application: ApplicationRecord, index: number) => {
    const isLastRow: boolean = index === applications.length - 1;

    return (
      <tr
        key={application.uuid}
        className={joinTw('h-40', 'odd:bg-tertiary')}
      >
        <td
          className={joinTw(
            isColumnVisible(columns, 'courseName') ? '' : 'hidden',
            isLastRow && 'rounded-bl-(--default-border-radius)',
          )}
        >
          {application.courseName}
        </td>
        <td className={joinTw(isColumnVisible(columns, 'university') ? '' : 'hidden')}>{application.university}</td>
        <td className={joinTw(isColumnVisible(columns, 'country') ? '' : 'hidden')}>{application.country}</td>
        <td className={joinTw(isColumnVisible(columns, 'programmeLength') ? '' : 'hidden')}>
          {application.programmeLength}
        </td>
        <td className={joinTw(isColumnVisible(columns, 'applicationStatus') ? '' : 'hidden')}>
          {application.applicationStatus.name ?? '-'}
        </td>
        <td className={joinTw(isColumnVisible(columns, 'interviewStatus') ? '' : 'hidden')}>
          {application.interviewStatus?.name ?? '-'}
        </td>
        <td className={joinTw(isColumnVisible(columns, 'offerStatus') ? '' : 'hidden')}>
          {application.offerStatus?.name ?? '-'}
        </td>
        <td className={joinTw(isColumnVisible(columns, 'responseStatus') ? '' : 'hidden')}>
          {application.responseStatus?.name ?? '-'}
        </td>
        <td className={joinTw(isColumnVisible(columns, 'finalDestinationStatus') ? '' : 'hidden')}>
          {application.finalDestinationStatus?.name ?? '-'}
        </td>
        <td className={joinTw(isLastRow && 'rounded-br-(--default-border-radius)')}>
          <CoreLink
            target={`edit/${application.uuid}`}
            state={application}
            label={
              <>
                {l.PAGES.COMMON.APPLICATIONS.ROW_BUTTONS.EDIT}
                <FontAwesomeIcon
                  icon={iconLibraryConfig.faWrench}
                  className={joinTw('ml-5')}
                />
              </>
            }
            intent={'table'}
          />
          <CoreLink
            target={`view/${application.uuid}`}
            state={application}
            label={
              <>
                {l.PAGES.COMMON.APPLICATIONS.ROW_BUTTONS.VIEW}
                <FontAwesomeIcon
                  icon={iconLibraryConfig.faMagnifyingGlass}
                  className={joinTw('ml-5')}
                />
              </>
            }
            intent={'table'}
          />
        </td>
      </tr>
    );
  });
};
