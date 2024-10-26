/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
 * Renders a password type input incorporated with the `react-hook-form` library to handle validation and error display.
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
