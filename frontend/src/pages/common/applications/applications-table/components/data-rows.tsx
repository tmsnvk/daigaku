/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreLink } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { joinTw } from '@daigaku/utilities';
import { isColumnVisible } from '../utilities.ts';

/* interface, type, enum, schema imports */
import { ApplicationRecord } from '@daigaku/common-types';
import { Column } from '../../common/types.ts';

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
  const { t } = useTranslation();

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
        <td className={isColumnVisible(columns, 'university') ? '' : 'hidden'}>{application.university}</td>
        <td className={isColumnVisible(columns, 'country') ? '' : 'hidden'}>{application.country}</td>
        <td className={isColumnVisible(columns, 'programmeLength') ? '' : 'hidden'}>{application.programmeLength}</td>
        <td className={isColumnVisible(columns, 'applicationStatus') ? '' : 'hidden'}>
          {application.applicationStatus.name ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'interviewStatus') ? '' : 'hidden'}>
          {application.interviewStatus?.name ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'offerStatus') ? '' : 'hidden'}>
          {application.offerStatus?.name ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'responseStatus') ? '' : 'hidden'}>
          {application.responseStatus?.name ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'finalDestinationStatus') ? '' : 'hidden'}>
          {application.finalDestinationStatus?.name ?? '-'}
        </td>
        <td className={joinTw(isLastRow && 'rounded-br-(--default-border-radius)')}>
          <CoreLink
            target={`edit/${application.uuid}`}
            state={application}
            label={
              <>
                {t('edit')}
                <FontAwesomeIcon
                  icon={iconLibraryConfig.faWrench}
                  className={'ml-5'}
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
                {t('view')}
                <FontAwesomeIcon
                  icon={iconLibraryConfig.faMagnifyingGlass}
                  className={'ml-5'}
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
