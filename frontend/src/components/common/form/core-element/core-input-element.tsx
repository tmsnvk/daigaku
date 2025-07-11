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

const coreInputElementVariants = cva(
  joinTw(
    'relative',
    'h-20 w-full',
    'px-4 pt-4',
    'border-2',
    'text-xl',
    'rounded-xl',
    'focus:outline-1',
    'placeholder:text-secondary',
  ),
  {
    variants: {
      intent: {
        light: joinTw('bg-primary border-secondary', 'focus:placeholder:text-secondary-muted focus:outline-secondary'),
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
export type CoreInputElementVariantIntent = VariantProps<typeof coreInputElementVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreInputElementProps<T extends FieldValues>
  extends VariantProps<typeof coreInputElementVariants>,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<T>;

  /**
   * The input element's type.
   */
  readonly type: string;

  /**
   * Indicates whether the input element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * Indicates whether there is an error involving the input element.
   */
  readonly isError: boolean;

  /**
   * The input element's placeholder value.
   */
  readonly placeholder?: string;

  /**
   * The input element's initial value.
   */
  readonly initialValue?: string | number;
}

/**
 * Renders the core input element used throughout the application.
 *
 * @param {CoreInputElementProps} props
 * @return {JSX.Element}
 */
export const CoreInputElement = <T extends FieldValues>({
  id,
  type,
  isDisabled,
  isError,
  placeholder,
  initialValue,
  intent,
}: CoreInputElementProps<T>): JSX.Element => {
  const { register } = useFormContext<T>();

  return (
    <input
      {...register(id)}
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      defaultValue={initialValue ?? ''}
      disabled={isDisabled}
      autoComplete={'off'}
      className={joinTw(coreInputElementVariants({ intent, isDisabled, isError }))}
    />
  );
};
