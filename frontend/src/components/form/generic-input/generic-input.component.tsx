/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { CommonInput } from '@common-types';

/**
 * Defines the properties of the {@link GenericInput} component.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues> extends CommonInput<T> {}

/**
 * Renders a generic input integrated with the `react-hook-form` library for validation and error handling.
 *
 * @param {ComponentProps<T>} props
 * @return {JSX.Element}
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
}: ComponentProps<T>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        label={label}
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
