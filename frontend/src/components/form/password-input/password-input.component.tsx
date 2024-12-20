/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* logic imports */
import { TogglePassword, useTogglePassword } from './password-input.hooks';

/* component, style imports */
import { BasePasswordInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/* interface, type, enum imports */
import { CommonInput } from '@common-types';

/**
 * ===============
 * Component {@link PasswordInput}
 * ===============
 */

/**
 * Renders a password input field that integrates with the `react-hook-form` library for validation and error handling.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const PasswordInput = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  label,
  placeholder,
  initialValue,
  isDisabled,
}: CommonInput<T>): JSX.Element => {
  // Custom hook that manages password visibility toggle.
  const { isTextRevealed, toggleTextVisibility }: TogglePassword = useTogglePassword();

  return (
    <BasePasswordInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={label}
      />
      <div>
        <input
          {...register(id, validationRules)}
          type={isTextRevealed ? 'text' : 'password'}
          id={id}
          name={id}
          autoComplete={'off'}
          placeholder={placeholder}
          disabled={isDisabled}
          defaultValue={initialValue ?? ''}
        />
        <FontAwesomeIcon
          onClick={toggleTextVisibility}
          icon={isTextRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
        />
      </div>
      {error && <InputError message={error} />}
    </BasePasswordInput>
  );
};
