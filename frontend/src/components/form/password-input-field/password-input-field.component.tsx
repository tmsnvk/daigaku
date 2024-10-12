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
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* logic imports */
import { TogglePassword, useTogglePassword } from './password-input-field.hooks';

/* component, style imports */
import { BasePasswordInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';

/**
 * ===============
 * Component {@link PasswordInputField}
 * ===============
 */

/**
 * The interface represents the properties of the {@link PasswordInputField} component.
 *
 * @since 0.0.1
 */
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

/**
 * The component renders a password type input field incorporated with the `react-hook-form` library to handle validation and error display.
 *
 * @param {ComponentProps} props
 * @param props.register `react-hook-form` register method.
 * @param props.validationRules Validation rules for `react-hook-form` validation handling.
 * @param props.error Error message if any.
 * @param props.id The id of the input field.
 * @param props.label The label of the input field.
 * @param props.placeholder The placeholder text of the input field.
 * @param props.defaultValue The default value of the input field.
 * @param props.isDisabled The disabled status of the input field.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
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
}: ComponentProps<T>): JSX.Element => {
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
          defaultValue={defaultValue ?? ''}
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
