/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, JSX } from 'react';
import { FieldValues, Path } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreInputElementVariants = cva(
  joinTw(
    'w-[95%] sm:w-[65%] h-20 px-4 text-xl border-2 border-secondary rounded-xl cursor-not-allowed bg-accent',
    "[&[type='number']]:w-40 [&[type='number']]:p-0 [&[type='number']]:text-center",
    'focus:outline-1 focus:outline-solid focus:placeholder:text-secondary-muted focus:outline-secondary',
    'placeholder:text-secondary',
  ),
);

/**
 * Defines the component's properties.
 */
interface CoreDisabledInputElementProps<T extends FieldValues>
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
   * The input element's initial value.
   */
  readonly initialValue: string | number;

  /**
   * Additional optional styling options.
   */
  readonly className?: string;
}

/**
 * Renders the core disabled input element used throughout the application.
 *
 * @param {CoreDisabledInputElementProps} props
 * @return {JSX.Element}
 */
export const CoreDisabledInputElement = <T extends FieldValues>({
  id,
  type,
  initialValue,
  className,
}: CoreDisabledInputElementProps<T>): JSX.Element => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      disabled
      readOnly
      defaultValue={initialValue}
      className={joinTw(coreInputElementVariants({ className }))}
    />
  );
};
