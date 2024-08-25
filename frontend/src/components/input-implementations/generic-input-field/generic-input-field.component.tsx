/**
 * @prettier
 */

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  validationRules?: {
    required?: {
      value: boolean;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  fieldError: string | undefined;
  fieldId: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  defaultValue?: string | number;
  isDisabled: boolean;
}

export const GenericInputField = <T extends FieldValues>({
  register,
  validationRules,
  fieldError,
  fieldId,
  label,
  type,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        inputId={fieldId}
        content={label}
      />
      <input
        {...register(fieldId, validationRules)}
        type={type}
        id={fieldId}
        name={fieldId}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
        defaultValue={defaultValue ?? ''}
      />
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};
