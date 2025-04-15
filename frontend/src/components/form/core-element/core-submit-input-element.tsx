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
import { joinTw } from '@daigaku/utilities';

const coreSubmitInputElementVariants = cva(
  joinTw('h-20 px-6 text-2xl font-bold rounded-xl tracking-widest hover:outline-2 focus:outline-1'),
  {
    variants: {
      intent: {
        dark: 'bg-secondary text-tertiary shadow-(--right-bottom-accent-shadow) focus:outline-accent hover:outline-accent',
      },
      isDisabled: {
        false: 'cursor-pointer',
        true: 'cursor-not-allowed',
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface CoreSubmitInputElementProps<T extends FieldValues>
  extends VariantProps<typeof coreSubmitInputElementVariants>,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<T>;

  /**
   * The submit input value as label.
   */
  readonly value: string;

  /**
   * Indicates whether the input element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * Additional optional styling options.
   */
  readonly className?: string;
}

/**
 * Renders the core submit input element used throughout the application.
 *
 * @param {CoreSubmitInputElementProps} props
 * @return {JSX.Element}
 */
export const CoreSubmitInputElement = <T extends FieldValues>({
  id,
  value,
  isDisabled,
  intent,
  className,
}: CoreSubmitInputElementProps<T>): JSX.Element => {
  return (
    <input
      id={id}
      name={id}
      type={'submit'}
      disabled={isDisabled}
      value={value}
      className={joinTw(coreSubmitInputElementVariants({ intent, isDisabled, className }))}
    />
  );
};
