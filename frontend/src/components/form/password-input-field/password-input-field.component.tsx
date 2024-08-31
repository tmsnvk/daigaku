/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* logic imports */
import { RevealPassword, useRevealPassword } from './password-input-field.hooks';

/* component, style imports */
import { BasePasswordInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  validationRules?: FormFieldValidation;
  fieldError: string | undefined;
  fieldId: Path<T>;
  labelContent: string;
  placeholder: string;
  defaultValue?: string | number;
  isDisabled: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const PasswordInputField = <T extends FieldValues>({
  register,
  validationRules,
  fieldError,
  fieldId,
  labelContent,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentProps<T>) => {
  const { isRevealed, toggleRevealIcon }: RevealPassword = useRevealPassword();

  return (
    <BasePasswordInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={fieldId}
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
      {fieldError && <InputError message={fieldError} />}
    </BasePasswordInput>
  );
};
