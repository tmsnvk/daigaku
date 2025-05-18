/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreFormElementInstruction, DisabledInputGroup } from '@daigaku/components/form';

/* interface, type, enum, schema imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface DisabledInputGroupsProps {
  /**
   *
   */
  readonly application: ApplicationRecord;
}

/**
 *
 *
 * @param {DisabledInputGroupsProps}
 * @return {JSX.Element}
 */
export const DisabledInputGroups = ({ application }: DisabledInputGroupsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <DisabledInputGroup
        id={'country'}
        type={'text'}
        label={t('countryLabel')}
        defaultValue={application.country}
      />
      <CoreFormElementInstruction paragraph={t('countryUpdateFieldInformation')} />
      <DisabledInputGroup
        id={'university'}
        type={'text'}
        label={t('universityLabel')}
        defaultValue={application.university}
      />
      <CoreFormElementInstruction paragraph={t('universityUpdateFieldInformation')} />
      <DisabledInputGroup
        id={'courseName'}
        type={'text'}
        label={t('courseNameLabel')}
        defaultValue={application.courseName}
      />
      <CoreFormElementInstruction paragraph={t('courseNameUpdateFieldInformation')} />
      <DisabledInputGroup
        id={'minorSubject'}
        type={'text'}
        label={t('minorSubjectLabel')}
        defaultValue={application.minorSubject ?? '-'}
      />
      <CoreFormElementInstruction paragraph={t('minorSubjectUpdateFieldInformation')} />
      <DisabledInputGroup
        id={'programmeLength'}
        type={'number'}
        label={t('programmeLengthLabel')}
        defaultValue={application.programmeLength}
      />
    </>
  );
};
