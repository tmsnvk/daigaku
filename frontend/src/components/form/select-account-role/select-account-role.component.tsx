/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { RoleOption } from '@services/role/role.service';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  id: Path<T>;
  isDisabled: boolean;
  roles: Array<RoleOption>;
}

/*
 * component - TODO - add functionality description
 */
export const SelectAccountRole = <T extends FieldValues>({ register, fieldError, id, isDisabled, roles }: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={id}
        content={'Account Type'}
      />
      <select
        {...register(id, {
          required: {
            value: true,
            message: 'Selecting an account role is required.',
          },
        })}
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
              {role.name.split('ROLE_')[1].toLowerCase()}
            </option>
          );
        })}
      </select>
      {fieldError && <InputError errorText={fieldError} />}
    </BaseInput>
  );
};
