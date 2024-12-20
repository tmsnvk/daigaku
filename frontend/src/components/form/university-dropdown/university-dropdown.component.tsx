/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './university-dropdown.constants';

/* interface, type, enum imports */
import { DropdownInput, UniversityOption } from '@common-types';

/**
 * ===============
 * Component {@link UniversityDropdown}
 * ===============
 */

/**
 * Renders a dropdown input component to select an {@link UniversityOption}.
 *
 * @param {DropdownInput<T, UniversityOption>} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const UniversityDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: DropdownInput<T, UniversityOption>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={constants.ui.dropdown.LABEL_TEXT}
      />
      <select
        {...register(id, validationRules)}
        id={id}
        name={id}
        disabled={isDisabled}
      >
        <option
          hidden
          value={''}
        >
          {constants.ui.dropdown.DEFAULT_VALUE}
        </option>
        {options.map((universityOption: UniversityOption) => (
          <option
            key={universityOption.uuid}
            value={universityOption.uuid}
          >
            {`${universityOption.name} - ${universityOption.abbreviation}`}
          </option>
        ))}
      </select>
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
