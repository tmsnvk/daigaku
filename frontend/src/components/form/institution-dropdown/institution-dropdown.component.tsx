/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './institution-dropdown.constants';

/* interface, type, enum imports */
import { DropdownInput, InstitutionOption } from '@common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues, InstitutionOption> extends DropdownInput<T, InstitutionOption> {}

/**
 * Renders a dropdown input component to select an {@link InstitutionOption}.
 *
 * @param {ComponentProps<T, InstitutionOption>} props
 * @return {JSX.Element}
 */
export const InstitutionDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: ComponentProps<T, InstitutionOption>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        label={constants.ui.dropdown.LABEL}
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
          {constants.ui.dropdown.DEFAULT_OPTION}
        </option>
        {options.map((institution: InstitutionOption) => (
          <option
            key={institution.uuid}
            value={institution.uuid}
          >
            {institution.name}
          </option>
        ))}
      </select>
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
