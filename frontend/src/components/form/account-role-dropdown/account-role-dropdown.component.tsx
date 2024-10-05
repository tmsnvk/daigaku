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
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './account-role-dropdown.constants';
import { formatRoleName } from './account-role-dropdown.utilities';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';
import { RoleOption } from '@services/role/role.service';

/**
 * ===============
 * Component {@link AccountRoleDropdown}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error: string | undefined;
  validationRules?: FormFieldValidation;
  id: Path<T>;
  isDisabled: boolean;
  roles: Array<RoleOption>;
}

/**
 * @description
 * A dropdown component to select an account role.
 *
 * @param {ComponentProps<T extends FieldValues>} props
 * @param props.register `react-hook-form` register method.
 * @param props.validationRules Validation rules for `react-hook-form` validation handling.
 * @param props.error Error message if any.
 * @param props.id The id of the input field.
 * @param props.isDisabled The disabled status of the input field.
 * @param props.roles The list of roles that should be available in the dropdown field.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const AccountRoleDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  roles,
}: ComponentProps<T>): JSX.Element => {
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
          Select your account type.
        </option>
        {roles.map((role: RoleOption) => {
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
