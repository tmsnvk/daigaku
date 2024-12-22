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
 * Defines the properties of the {@link GenericTextarea} component.
 */
interface ComponentProps<T extends FieldValues> extends CommonInput<T> {
  /**
   * The default number of rows for the textarea.
   */
  rows: number;

  /**
   * The default number of columns for the textarea.
   */
  cols: number;
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
        labelText={label}
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
