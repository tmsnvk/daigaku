import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import {
  InputError,
  InputLabel,
} from '@components/form';

import { RoleOption } from '@services/role/role.service';

interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: Array<RoleOption>;
}

const SelectAccountType = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  data,
}: ComponentProps<T>) => {
  return (
    <BaseInput
      $isError={fieldError !== undefined}
    >
      <InputLabel
        inputId={fieldId}
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
        {data.map((option: RoleOption) => {
          return (
            <option
              key={option.uuid}
              value={option.uuid}
            >
              {option.name.split('ROLE_')[1].toLowerCase()}
            </option>
          );
        })}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};

export default SelectAccountType;
