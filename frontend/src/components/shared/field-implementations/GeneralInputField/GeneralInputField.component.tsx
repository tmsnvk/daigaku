import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';

type ComponentPropsT <T extends FieldValues> = {
  register: UseFormRegister<T>;
  validationPattern: RegExp;
  validationError: string;
  requiredError?: string;
  fieldError: string | undefined;
  fieldId: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  defaultValue: string | number;
  isDisabled: boolean;
}

const GeneralInputField = <T extends FieldValues>({
  register,
  validationPattern,
  validationError,
  requiredError,
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
        {...register(fieldId, {
          pattern: {
            value: validationPattern,
            message: validationError,
          },
          required: {
            value: requiredError !== undefined,
            message: requiredError as string,
          },
        })}
        type={type}
        id={fieldId}
        name={fieldId}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
        defaultValue={defaultValue}
      />
      {fieldError && <ErrorMessage error={fieldError} />}
    </InputFieldStyles>
  );
};

export default GeneralInputField;
