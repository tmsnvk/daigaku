/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  validationRules?: FormFieldValidation;
  error: string | undefined;
  id: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  defaultValue?: string | number;
  isDisabled: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const GenericInputField = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  label,
  type,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        fieldId={id}
        content={label}
      />
      <input
        {...register(id, validationRules)}
        type={type}
        id={id}
        name={id}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
        defaultValue={defaultValue ?? ''}
      />
      {error && <InputError errorText={error} />}
    </BaseInput>
  );
};
