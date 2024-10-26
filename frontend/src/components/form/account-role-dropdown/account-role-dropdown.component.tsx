/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './account-role-dropdown.constants';
import { formatRoleName } from './account-role-dropdown.utilities';

/* interface, type, enum imports */
import { DropdownInput } from '@common-types';
import { RoleOption } from '@services/role/role.service';

/**
 * ===============
 * Component {@link AccountRoleDropdown}
 * ===============
 */

/**
 * Renders a dropdown component to select a {@link RoleOption}.
 *
 * @param {DropdownInput<T, RoleOption>} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const AccountRoleDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: DropdownInput<T, RoleOption>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={constants.input.LABEL_TEXT}
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
          {constants.input.DEFAULT_OPTION}
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
