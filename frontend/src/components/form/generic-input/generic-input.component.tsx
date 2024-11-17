/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { CommonInput } from '@common-types';

/**
 * ===============
 * Component {@link GenericInput}
 * ===============
 */

/**
 * Renders a generic input integrated with the `react-hook-form` library for validation and error handling.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const GenericInput = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  label,
  type,
  placeholder,
  initialValue,
  isDisabled,
}: CommonInput<T>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={label}
      />
      <input
        {...register(id, validationRules)}
        type={type}
        id={id}
        name={id}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
        defaultValue={initialValue ?? ''}
      />
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
