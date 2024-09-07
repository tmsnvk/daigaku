/**
 * @prettier
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

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
  error: string | undefined;
  id: Path<T>;
  label: string;
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
  error,
  id,
  label,
  placeholder,
  defaultValue,
  isDisabled,
}: ComponentProps<T>) => {
  const { isRevealed, toggleRevealIcon }: RevealPassword = useRevealPassword();

  return (
    <BasePasswordInput $isError={error !== undefined}>
      <InputLabel
        fieldId={id}
        content={label}
      />
      <div>
        <input
          {...register(id, validationRules)}
          type={isRevealed ? 'text' : 'password'}
          id={id}
          name={id}
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
      {error && <InputError errorText={error} />}
    </BasePasswordInput>
  );
};
