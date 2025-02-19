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
import { localization as l } from '@constants';
import { formatRoleName } from './account-role-dropdown.utilities';

/* interface, type, enum imports */
import { DropdownInput, RoleOption } from '@common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues, RoleOption> extends DropdownInput<T, RoleOption> {}

/**
 * Renders a dropdown component to select a {@link RoleOption}.
 *
 * @param {ComponentProps<T extends FieldValues, RoleOption>} props
 * @return {JSX.Element}
 */
export const AccountRoleDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: ComponentProps<T, RoleOption>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        label={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.LABEL}
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
          {l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.DEFAULT_OPTION}
        </option>
        {options.map((role: RoleOption) => {
          return (
            <option
              key={role.uuid}
              value={role.uuid}
            >
              {formatRoleName(role.name)}
            </option>
          );
        })}
      </select>
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
