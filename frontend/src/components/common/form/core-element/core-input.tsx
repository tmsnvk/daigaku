/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, JSX } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreInputVariants = cva(
  joinTw('relative h-20 w-full px-4 pt-4 border-2 text-xl rounded-xl', 'focus:outline-1', 'placeholder:text-secondary'),
  {
    variants: {
      intent: {
        light: joinTw('bg-primary border-secondary', 'focus:placeholder:text-secondary-muted focus:outline-secondary'),
      },
    },
  },
);

/**
 */
export type CoreInputVariantIntent = VariantProps<typeof coreInputVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreInputProps<TFormValues extends FieldValues>
  extends VariantProps<typeof coreInputVariants>,
    InputHTMLAttributes<HTMLInputElement> {
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
 * Renders the core input element used throughout the application.
 *
 * @param {CoreInputProps} props
 * @return {JSX.Element}
 */
export const CoreInput = <TFormValues extends FieldValues>({
  id,
  type,
  disabled,
  error,
  placeholder,
  defaultValue,
  intent,
}: CoreInputProps<TFormValues>): JSX.Element => {
  const { register } = useFormContext<TFormValues>();

  return (
    <input
      {...register(id)}
      autoComplete={'off'}
      className={joinTw(
        coreInputVariants({ intent }),
        disabled && 'placeholder:text-secondary-muted cursor-not-allowed',
        error && 'border-destructive focus:outline-destructive',
      )}
      defaultValue={defaultValue ?? ''}
      disabled={disabled}
      id={id}
      name={id}
      placeholder={placeholder}
      type={type}
    />
  );
};
