/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { getStatusDisplayValue, joinTw } from '@daigaku/utilities';
import { isColumnVisible } from '../utilities.ts';

/* component imports */
import { CoreLink } from '@daigaku/components/common/core';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/* interface, type imports */
import {
  Application,
  ApplicationStatusTranslations,
  FinalDestinationStatusTranslations,
  InterviewStatusTranslations,
  OfferStatusTranslations,
  ResponseStatusTranslations,
} from '@daigaku/common-types';
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
  readonly applications: Array<Application>;
}

/**
 * Renders a <tr> element for each data element in the applications record array.
 *
 * @return {Array<JSX.Element>}
 */
export const DataRows = ({ columns, applications }: DataRowsProps): Array<JSX.Element> => {
  const { t } = useTranslation();

  return applications.map((application: Application, index: number) => {
    const isLastRow: boolean = index === applications.length - 1;

    return (
      <tr
        className={joinTw('h-40', 'odd:bg-tertiary')}
        key={application.uuid}
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
          {getStatusDisplayValue(ApplicationStatusTranslations, application.applicationStatus, t) ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'interviewStatus') ? '' : 'hidden'}>
          {getStatusDisplayValue(InterviewStatusTranslations, application.interviewStatus, t) ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'offerStatus') ? '' : 'hidden'}>
          {getStatusDisplayValue(OfferStatusTranslations, application.offerStatus, t) ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'responseStatus') ? '' : 'hidden'}>
          {getStatusDisplayValue(ResponseStatusTranslations, application.responseStatus, t) ?? '-'}
        </td>
        <td className={isColumnVisible(columns, 'finalDestinationStatus') ? '' : 'hidden'}>
          {getStatusDisplayValue(FinalDestinationStatusTranslations, application.finalDestinationStatus, t) ?? '-'}
        </td>
        <td className={joinTw(isLastRow && 'rounded-br-(--default-border-radius)')}>
          <CoreLink
            intent={'table'}
            label={
              <>
                {t('app.page.applications.buttons.edit')}
                <FontAwesomeIcon
                  className={'ml-5'}
                  icon={iconLibrary.faWrench}
                />
              </>
            }
            target={`student/edit/${application.uuid}`}
          />
          <CoreLink
            intent={'table'}
            label={
              <>
                {t('app.page.applications.buttons.view')}
                <FontAwesomeIcon
                  className={'ml-5'}
                  icon={iconLibrary.faMagnifyingGlass}
                />
              </>
            }
            target={`student/view/${application.uuid}`}
          />
        </td>
      </tr>
    );
  });
};
