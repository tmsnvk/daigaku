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
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseTextarea } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { CoreInput } from '@common-types';

/**
 * ===============
 * Component {@link GenericTextarea}
 * ===============
 */

/**
 * Defines the properties of the {@link GenericTextarea} component.
 *
 * @since 0.0.1
 */
interface ComponentProps<T extends FieldValues> extends CoreInput<T> {
  /**
   * Textarea label.
   */
  label: string;

  /**
   * The default number of rows for the textarea.
   */
  rows: number;

  /**
   * The default number of columns for the textarea.
   */
  cols: number;

  /**
   * Textarea placeholder text.
   */
  placeholder: string;
}

/**
 * Renders a generic textarea integrated with the `react-hook-form` library for validation and error handling.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
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
