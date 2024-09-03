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
  fieldId: Path<T>;
  isDisabled: boolean;
  roleOptions: Array<RoleOption>;
}

/*
 * component - TODO - add functionality description
 */
export const SelectAccountRole = <T extends FieldValues>({ register, fieldError, fieldId, isDisabled, roleOptions }: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        id={fieldId}
        content={'Account Type'}
      />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting an account role is required.',
          },
        })}
        id={fieldId}
        name={fieldId}
        disabled={isDisabled}
      >
        <option
          hidden
          value={''}
        >
          Select your account type.
        </option>
        {roleOptions.map((roleOption: RoleOption) => {
          return (
            <option
              key={roleOption.uuid}
              value={roleOption.uuid}
            >
              {roleOption.name.split('ROLE_')[1].toLowerCase()}
            </option>
          );
        })}
      </select>
      {fieldError && <InputError errorText={fieldError} />}
    </BaseInput>
  );
};
