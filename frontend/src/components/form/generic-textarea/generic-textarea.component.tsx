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
import { BaseTextarea } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { CommonInput } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps<T extends FieldValues> extends CommonInput<T> {
  /**
   * The textarea's row size.
   */
  readonly rows: number;

  /**
   * The textarea's column size.
   */
  readonly cols: number;
}

/**
 * Renders a generic textarea integrated with the `react-hook-form` library for validation and error handling.
 *
 * @param {ComponentProps<T>} props
 * @return {JSX.Element}
 */
export const GenericTextarea = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  label,
  rows,
  cols,
  placeholder,
  isDisabled,
}: ComponentProps<T>): JSX.Element => {
  return (
    <BaseTextarea $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        label={label}
      />
      <textarea
        {...register(id, validationRules)}
        id={id}
        name={id}
        rows={rows}
        cols={cols}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {error && <InputError message={error} />}
    </BaseTextarea>
  );
};
