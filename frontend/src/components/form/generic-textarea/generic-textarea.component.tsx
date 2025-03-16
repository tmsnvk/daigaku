/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component imports */
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
 * Renders a textarea element integrated with the `react-hook-form` library for validation and error handling.
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
    <article className={'w-[100%] flex flex-col items-center mb-[5rem]'}>
      <InputLabel
        inputId={id}
        label={label}
      />
      <textarea
        {...register(id, validationRules)}
        id={id}
        name={id}
        className={`w-[90%] md:w-[75%] px-[1.5rem] py-[2rem] text-base ${
          isDisabled ? 'text-accent' : 'text(--color-columbia-blue)'
        } bg-(--color-columbia-blue) rounded-(--default-border-radius) border-[0.2rem] border-solid ${
          error ? 'border-(--color-coral-red)' : 'border-(--color-dark-gun-metal)'
        } placeholder:text-(--color-jacarta) hover:border-accent focus:border-accent focus:outline-[0.15rem] focus:outline-solid focus:outline-accent focus:placeholder:text-transparent disabled:cursor-not-allowed`}
        rows={rows}
        cols={cols}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {error && <InputError message={error} />}
    </article>
  );
};
