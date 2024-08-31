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
  fieldError: string | undefined;
  fieldId: Path<T>;
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
        fieldId={fieldId}
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
      {fieldError && <InputError message={fieldError} />}
    </BaseInput>
  );
};
