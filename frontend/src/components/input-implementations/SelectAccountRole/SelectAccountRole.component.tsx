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

import { RoleOptionT } from '@services/role/role.service.ts';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: RoleOptionT[];
}

const SelectAccountType = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  data,
}: ComponentPropsT<T>) => {
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
        <option hidden value={''}>Select your account type.</option>
        {data.map((option: RoleOptionT) => (
          <option key={option.uuid} value={option.uuid}>{option.name.split('ROLE_')[1].toLowerCase()}</option>
        ))}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};

export default SelectAccountType;
