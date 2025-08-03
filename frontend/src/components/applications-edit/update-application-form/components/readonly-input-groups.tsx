/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { ElementInstruction, ReadOnlyInputGroup } from '@daigaku/components/common/form';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface ReadOnlyInputGroupsProps {
  /**
   *
   */
  readonly application: Application;
}

/**
 *
 *
 * @param {ReadOnlyInputGroupsProps}
 * @return {JSX.Element}
 */
export const ReadOnlyInputGroups = ({ application }: ReadOnlyInputGroupsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <ReadOnlyInputGroup
        label={t('app.page.applicationEdit.form.countryLabel')}
        value={application.country}
      />
      <ElementInstruction paragraph={t('app.page.applicationEdit.description.country')} />
      <ReadOnlyInputGroup
        label={t('app.page.applicationEdit.form.universityLabel')}
        value={application.university}
      />
      <ElementInstruction paragraph={t('app.page.applicationEdit.description.university')} />
      <ReadOnlyInputGroup
        label={t('app.page.applicationEdit.form.courseNameLabel')}
        value={application.courseName}
      />
      <ElementInstruction paragraph={t('app.page.applicationEdit.description.courseName')} />
      <ReadOnlyInputGroup
        label={t('app.page.applicationEdit.form.minorSubjectLabel')}
        value={application.minorSubject ?? '-'}
      />
      <ElementInstruction paragraph={t('app.page.applicationEdit.description.minorSubject')} />
      <ReadOnlyInputGroup
        label={t('app.page.applicationEdit.form.programmeLengthLabel')}
        value={application.programmeLength}
      />
      <ElementInstruction paragraph={t('app.page.applicationEdit.description.programmeLength')} />
    </>
  );
};
