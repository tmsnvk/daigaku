import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  InputError,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';

type ComponentPropsT <T extends FieldValues> = {
  register: UseFormRegister<T>;
  validationRules?: {
    required?: {
      value: boolean;
      message: string;
    }
    pattern?: {
      value: RegExp;
      message: string;
    }
  }
  fieldError: string | undefined;
  fieldId: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  defaultValue?: string | number;
  isDisabled: boolean;
}

const GenericInputField = <T extends FieldValues>({
  register,
  validationRules,
  fieldError,
  fieldId,
  label,
  type,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentPropsT<T>) => {
  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={label} />
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
    </InputFieldStyles>
  );
};

export default GenericInputField;
