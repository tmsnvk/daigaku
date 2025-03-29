/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, JSX } from 'react';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreInputElementVariants = cva(
  joinTw(
    'w-[95%] sm:w-[65%] h-[5rem] px-4 text-xl border-2 rounded-xl',
    "[&[type='number']]:w-[10rem] [&[type='number']]:p-0 [&[type='number']]:text-center",
    'focus:outline-1',
    'placeholder:text-secondary',
  ),
  {
    variants: {
      intent: {
        light: 'bg-primary border-secondary focus:placeholder:text-secondary-muted focus:outline-secondary',
      },
      isDisabled: {
        true: 'cursor-not-allowed',
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
interface CoreInputElementProps<T extends FieldValues>
  extends VariantProps<typeof coreInputElementVariants>,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional validation rules to handle the input element's validation using the `react-hook-form` library for validation management.
   */
  readonly validationRules: RegisterOptions<FieldValues, Path<T>> | undefined;

  /**
   * The input element's id.
   */
  readonly id: Path<T>;

  /**
   * The input element's type.
   */
  readonly type: string;

  /**
   * The input element's placeholder value.
   */
  readonly placeholder?: string;

  /**
   * The input element's initial value.
   */
  readonly initialValue?: string | number;

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
 * Renders the core input element used throughout the application.
 *
 * @param {CoreInputElementProps} props
 * @return {JSX.Element}
 */
export const CoreInputElement = <T extends FieldValues>({
  validationRules,
  id,
  type,
  placeholder,
  initialValue,
  isDisabled,
  isError,
  intent,
  className,
}: CoreInputElementProps<T>): JSX.Element => {
  const { register } = useFormContext();

  return (
    <input
      {...register(id, validationRules)}
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      defaultValue={initialValue ?? ''}
      disabled={isDisabled}
      autoComplete={'off'}
      className={joinTw(coreInputElementVariants({ intent, isDisabled, isError, className }))}
    />
  );
};
