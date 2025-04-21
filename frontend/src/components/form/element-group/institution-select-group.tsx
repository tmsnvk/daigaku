/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreSelectElement } from '../core-element/core-select-element.tsx';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';

/* interface, type, enum imports */
import { CoreSelectElementGroup, InstitutionOption } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 * @template InstitutionOption - The type representing an institution option.
 */
interface InstitutionSelectGroupProps<T extends FieldValues, InstitutionOption>
  extends CoreSelectElementGroup<T, InstitutionOption> {}

/**
 * Renders a select element group instance integrated with the `react-hook-form` library to select a
 * {@link InstitutionOption}.
 *
 * @param {InstitutionSelectGroupProps<T extends FieldValues, InstitutionOption>} props
 * @return {JSX.Element}
 */
export const InstitutionSelectGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  isDisabled,
  options,
  intent,
}: InstitutionSelectGroupProps<T, InstitutionOption>): JSX.Element => {
  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        content={l.COMPONENTS.FORM.INSTITUTION_DROPDOWN.LABEL}
      />
      <CoreSelectElement
        validationRules={validationRules}
        id={id}
        options={options.map((institution: InstitutionOption) => (
          <option
            key={institution.uuid}
            value={institution.uuid}
          >
            {institution.name}
          </option>
        ))}
        defaultOption={l.COMPONENTS.FORM.INSTITUTION_DROPDOWN.DEFAULT_OPTION}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={intent}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
