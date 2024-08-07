import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  RevealPasswordHook,
  useRevealPassword,
} from './password-input-field.hooks';

import { BasePasswordInput } from '@components/base-styles';
import {
  InputError,
  InputLabel,
} from '@components/form';

import { iconLibraryConfig } from '@configuration';

interface ComponentProps<T extends FieldValues> {
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
  labelContent: string;
  placeholder: string;
  defaultValue?: string | number;
  isDisabled: boolean;
}

const PasswordInputField = <T extends FieldValues>({
  register,
  validationRules,
  fieldError,
  fieldId,
  labelContent,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentProps<T>) => {
  const { isRevealed, toggleRevealIcon }: RevealPasswordHook = useRevealPassword();

  return (
    <BasePasswordInput
      $isError={fieldError !== undefined}
    >
      <InputLabel
        inputId={fieldId}
        content={labelContent}
      />
      <div>
        <input
          {...register(fieldId, validationRules)}
          type={isRevealed ? 'text' : 'password'}
          id={fieldId}
          name={fieldId}
          autoComplete={'off'}
          placeholder={placeholder}
          disabled={isDisabled}
          defaultValue={defaultValue ?? ''}
        />
        <FontAwesomeIcon
          onClick={toggleRevealIcon}
          icon={isRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
        />
      </div>
      {fieldError && <InputError content={fieldError} />}
    </BasePasswordInput>
  );
};

export default PasswordInputField;
