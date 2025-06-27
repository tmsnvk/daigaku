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

const coreTextareaElementVariants = cva(
  joinTw(
    'w-[90%] md:w-[75%]',
    'px-6 py-8',
    'border-2',
    'text-xl',
    'rounded-xl',
    'hover:outline-1',
    'focus:outline-1',
    'placeholder:text-secondary',
  ),
  {
    variants: {
      intent: {
        light: joinTw(
          'bg-primary border-secondary',
          'text-secondary',
          'focus:placeholder:text-secondary-muted focus:outline-secondary',
        ),
      },
      isDisabled: {
        true: joinTw('cursor-not-allowed', 'placeholder:text-secondary-muted'),
      },
      isError: {
        true: joinTw('border-destructive', 'focus:outline-destructive'),
      },
    },
  },
);

/**
 */
export type CoreTextareaElementVariantIntent = VariantProps<typeof coreTextareaElementVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreTextareaElementProps<TFormValues extends FieldValues>
  extends VariantProps<typeof coreTextareaElementVariants>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   * The textarea's row size.
   */
  readonly rows: number;

  /**
   * The textarea's column size.
   */
  readonly cols: number;

  /**
   * The input element's placeholder value.
   */
  readonly placeholder: string;

  /**
   * Indicates whether the input element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * Indicates whether there is an error involving the input element.
   */
  readonly isError: boolean;
}

/**
 * Renders the core textarea element used throughout the application.
 *
 * @param {CoreTextareaElementProps} props
 * @return {JSX.Element}
 */
export const CoreTextareaElement = <TFormValues extends FieldValues>({
  id,
  rows,
  cols,
  placeholder,
  isDisabled,
  isError,
  intent,
}: CoreTextareaElementProps<TFormValues>): JSX.Element => {
  const { register } = useFormContext();

  return (
    <textarea
      {...register(id)}
      id={id}
      name={id}
      rows={rows}
      cols={cols}
      autoComplete={'off'}
      placeholder={placeholder}
      disabled={isDisabled}
      className={joinTw(coreTextareaElementVariants({ intent, isDisabled, isError }))}
    />
  );
};
