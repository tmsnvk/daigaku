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
    <section>
      <InputFieldStyles $isError={fieldError !== undefined}>
        <InputLabel inputId={fieldId} content={label} />
        <input
          {...register(fieldId, {
            required: { value: true, message: requiredError as string },
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
    </section>
  );
};

export default GeneralInputField;
