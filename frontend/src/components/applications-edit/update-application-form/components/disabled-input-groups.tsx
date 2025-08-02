/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreFormElementInstruction, DisabledInputGroup } from '@daigaku/components/common/form';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface DisabledInputGroupsProps {
  /**
   *
   */
  readonly application: Application;
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
        label={t('app.page.applicationEdit.form.countryLabel')}
        defaultValue={application.country}
      />
      <CoreFormElementInstruction paragraph={t('app.page.applicationEdit.description.country')} />
      <DisabledInputGroup
        id={'university'}
        type={'text'}
        label={t('app.page.applicationEdit.form.universityLabel')}
        defaultValue={application.university}
      />
      <CoreFormElementInstruction paragraph={t('app.page.applicationEdit.description.university')} />
      <DisabledInputGroup
        id={'courseName'}
        type={'text'}
        label={t('app.page.applicationEdit.form.courseNameLabel')}
        defaultValue={application.courseName}
      />
      <CoreFormElementInstruction paragraph={t('app.page.applicationEdit.coursedescription.courseName')} />
      <DisabledInputGroup
        id={'minorSubject'}
        type={'text'}
        label={t('app.page.applicationEdit.form.minorSubjectLabel')}
        defaultValue={application.minorSubject ?? '-'}
      />
      <CoreFormElementInstruction paragraph={t('app.page.applicationEdit.description.minorSubject')} />
      <DisabledInputGroup
        id={'programmeLength'}
        type={'number'}
        label={t('app.page.applicationEdit.form.programmeLengthLabel')}
        defaultValue={application.programmeLength}
      />
      <CoreFormElementInstruction paragraph={t('app.page.applicationEdit.description.programmeLength')} />
    </>
  );
};
