/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreSelectElement } from '../core-element/core-select-element';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { CoreSelectElementGroup, UniversityOption } from '@common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 * @template UniversityOption - The type representing representing a university option.
 */
interface UniversitySelectGroupProps<T extends FieldValues, UniversityOption> extends CoreSelectElementGroup<T, UniversityOption> {}

/**
 * Renders a select element group instance integrated with the `react-hook-form` library to select a {@link UniversityOption}.
 *
 * @param {UniversitySelectGroupProps<T, UniversityOption>} props
 * @return {JSX.Element}
 */
export const UniversitySelectGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  isDisabled,
  options,
  intent,
}: UniversitySelectGroupProps<T, UniversityOption>): JSX.Element => {
  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        content={l.COMPONENTS.FORM.UNIVERSITY_DROPDOWN.LABEL}
      />
      <CoreSelectElement
        validationRules={validationRules}
        id={id}
        options={options.map((universityOption: UniversityOption) => (
          <option
            key={universityOption.uuid}
            value={universityOption.uuid}
          >
            {`${universityOption.name} - ${universityOption.abbreviation}`}
          </option>
        ))}
        defaultOption={l.COMPONENTS.FORM.UNIVERSITY_DROPDOWN.DEFAULT_OPTION}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={intent}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
