import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRevealPasswordInInputField } from '@hooks/index.ts';
import {
  ErrorMessage,
  InputLabel,
  PasswordInputFieldStyles,
} from '@components/shared/form';
import { iconLibraryConfig } from '@configuration';

type ComponentPropsT <T extends FieldValues> = {
  register: UseFormRegister<T>;
  validation?: {
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
  placeholder: string;
  defaultValue?: string | number;
  isDisabled: boolean;
}

const PasswordInputField = <T extends FieldValues>({
  register,
  validation,
  fieldError,
  fieldId,
  label,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentPropsT<T>) => {
  const { isRevealed, handleRevealClick } = useRevealPasswordInInputField();

  return (
    <PasswordInputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={label} />
      <div>
        <input
          {...register(fieldId, validation)}
          type={isRevealed ? 'text' : 'password'}
          id={fieldId}
          name={fieldId}
          autoComplete={'off'}
          placeholder={placeholder}
          disabled={isDisabled}
          defaultValue={defaultValue ?? ''}
        />
        <FontAwesomeIcon onClick={handleRevealClick} icon={isRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye} />
      </div>
      {fieldError && <ErrorMessage content={fieldError} />}
    </PasswordInputFieldStyles>
  );
};

export default PasswordInputField;
