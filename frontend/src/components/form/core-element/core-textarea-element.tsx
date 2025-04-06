/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, TextareaHTMLAttributes } from 'react';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreTextareaElementVariants = cva(
  joinTw('w-[90%] md:w-[75%] px-6 py-8 text-xl border-2 rounded-xl', 'hover:outline-2', 'focus:outline-1'),
  {
    variants: {
      intent: {
        light: 'bg-primary text-primary border-secondary focus:placeholder:text-secondary-muted focus:outline-secondary',
      },
      isDisabled: {
        true: 'cursor-not-allowed placeholder:text-secondary-muted',
      },
      isError: {
        true: 'border-destructive focus:outline-destructive',
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface CoreTextareaElementProps<T extends FieldValues>
  extends VariantProps<typeof coreTextareaElementVariants>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Optional validation rules to handle the input element's validation using the `react-hook-form` library for validation management.
   */
  readonly validationRules: RegisterOptions<FieldValues, Path<T>> | undefined;

  /**
   * The input element's id.
   */
  readonly id: Path<T>;

  /**
   * The input element's placeholder value.
   */
  readonly placeholder?: string;

  /**
   * The textarea's row size.
   */
  readonly rows: number;

  /**
   * The textarea's column size.
   */
  readonly cols: number;

  /**
   * Indicates whether the input element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * Indicates whether there is an error involving the input element.
   */
  readonly isError: boolean;

  /**
   * Additional optional styling options.
   */
  readonly className?: string;
}

/**
 * Renders the core textarea element used throughout the application.
 *
 * @param {CoreTextareaElementProps} props
 * @return {JSX.Element}
 */
export const CoreTextareaElement = <T extends FieldValues>({
  validationRules,
  id,
  placeholder,
  rows,
  cols,
  isDisabled,
  isError,
  intent,
  className,
}: CoreTextareaElementProps<T>): JSX.Element => {
  const { register } = useFormContext();

  return (
    <textarea
      {...register(id, validationRules)}
      id={id}
      name={id}
      rows={rows}
      cols={cols}
      autoComplete={'off'}
      placeholder={placeholder}
      disabled={isDisabled}
      className={joinTw(coreTextareaElementVariants({ intent, isDisabled, isError, className }))}
    />
  );
};
