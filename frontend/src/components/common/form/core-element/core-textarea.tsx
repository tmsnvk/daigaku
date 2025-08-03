/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, TextareaHTMLAttributes } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreTextareaVariants = cva(
  joinTw(
    'w-[90%] px-6 py-8 border-2 text-xl rounded-xl',
    'md:w-[75%]',
    'hover:outline-1',
    'focus:outline-1',
    'placeholder:text-secondary',
  ),
  {
    variants: {
      intent: {
        light: joinTw(
          'bg-primary border-secondary text-secondary',
          'focus:placeholder:text-secondary-muted focus:outline-secondary',
        ),
      },
    },
  },
);

/**
 *
 */
export type CoreTextareaVariantIntent = VariantProps<typeof coreTextareaVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreTextareaProps<TFormValues extends FieldValues>
  extends VariantProps<typeof coreTextareaVariants>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   * Indicates whether there is an error involving the input element.
   */
  readonly error: boolean;
}

/**
 * Renders the core textarea element used throughout the application.
 *
 * @param {CoreTextareaProps} props
 * @return {JSX.Element}
 */
export const CoreTextarea = <TFormValues extends FieldValues>({
  id,
  rows,
  cols,
  placeholder,
  disabled,
  error,
  intent,
}: CoreTextareaProps<TFormValues>): JSX.Element => {
  const { register } = useFormContext();

  return (
    <textarea
      {...register(id)}
      autoComplete={'off'}
      className={joinTw(
        coreTextareaVariants({ intent }),
        disabled && 'placeholder:text-secondary-muted cursor-not-allowed',
        error && 'border-destructive focus:outline-destructive',
      )}
      cols={cols}
      disabled={disabled}
      id={id}
      name={id}
      placeholder={placeholder}
      rows={rows}
    />
  );
};
