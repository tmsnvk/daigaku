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
  joinTw('h-20', 'px-6', 'text-2xl font-bold tracking-widest', 'rounded-xl', 'hover:outline-2', 'focus:outline-1'),
  {
    variants: {
      intent: {
        dark: joinTw(
          'bg-secondary',
          'text-tertiary',
          'shadow-(--right-bottom-accent-shadow)',
          'hover:outline-accent',
          'focus:outline-accent',
        ),
      },
      isDisabled: {
        false: 'cursor-pointer',
        true: 'cursor-not-allowed',
      },
    },
  },
);

/**
 */
export type CorSubmitElementVariantIntent = VariantProps<typeof coreSubmitInputElementVariants>['intent'];

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
}: CoreSubmitInputElementProps<T>): JSX.Element => {
  return (
    <input
      id={id}
      name={id}
      type={'submit'}
      disabled={isDisabled}
      value={value}
      className={joinTw(coreSubmitInputElementVariants({ intent, isDisabled }))}
    />
  );
};
