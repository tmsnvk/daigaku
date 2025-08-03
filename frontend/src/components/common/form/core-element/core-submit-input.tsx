/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, JSX } from 'react';
import { FieldValues, Path } from 'react-hook-form';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreSubmitInputVariants = cva(
  joinTw('h-20 px-6 text-2xl font-bold tracking-widest rounded-xl', 'hover:outline-2', 'focus:outline-1'),
  {
    variants: {
      intent: {
        dark: joinTw(
          'bg-secondary text-tertiary shadow-(--right-bottom-accent-shadow)',
          'hover:outline-accent',
          'focus:outline-accent',
        ),
      },
    },
  },
);

/**
 */
export type CoreSubmitVariantIntent = VariantProps<typeof coreSubmitInputVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreSubmitInputProps<TFormValues extends FieldValues>
  extends VariantProps<typeof coreSubmitInputVariants>,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;
}

/**
 * Renders the core submit input element used throughout the application.
 *
 * @param {CoreSubmitInputProps} props
 * @return {JSX.Element}
 */
export const CoreSubmitInput = <TFormValues extends FieldValues>({
  id,
  value,
  disabled,
  intent,
}: CoreSubmitInputProps<TFormValues>): JSX.Element => {
  return (
    <input
      className={joinTw(coreSubmitInputVariants({ intent }), disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
      disabled={disabled}
      id={id}
      name={id}
      type={'submit'}
      value={value}
    />
  );
};
