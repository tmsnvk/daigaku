import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  InputError,
  InputFieldStyles,
  InputLabel,
} from '@components/form';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
}

const SelectAccountType = <T extends FieldValues>({ register, fieldError, fieldId, isDisabled }: ComponentPropsT<T>) => {
  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={'Account Type'} />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting an account type is required.',
          },
        })}
        id={fieldId}
        name={fieldId}
        disabled={isDisabled}
      >
        <option hidden value={''}>Select your account type.</option>
        <option value='STUDENT'>Student</option>
        <option value='MENTOR'>Mentor</option>
      </select>
      {fieldError && <InputError content={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectAccountType;
