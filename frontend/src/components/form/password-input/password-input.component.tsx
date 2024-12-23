/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* logic imports */
import { useTogglePassword } from './password-input.hooks';

/* component, style imports */
import { BasePasswordInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/* interface, type, enum imports */
import { CommonInput } from '@common-types';
import { TogglePassword } from './password-input.models';

/**
 * Defines the properties of the {@link PasswordInput} component.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues> extends CommonInput<T> {}

/**
 * Renders a password input field that integrates with the `react-hook-form` library for validation and error handling.
 *
 * @param {ComponentProps<T>} props
 * @return {JSX.Element}
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
}: ComponentProps<T>): JSX.Element => {
  const { isTextRevealed, toggleInputVisibility }: TogglePassword = useTogglePassword();

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
          onClick={toggleInputVisibility}
          icon={isTextRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
        />
      </div>
      {error && <InputError message={error} />}
    </BasePasswordInput>
  );
};
