/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, JSX, ReactNode } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreButtonVariants = cva('font-bold tracking-widest cursor-pointer', {
  variants: {
    intent: {
      light: joinTw(
        'h-20 px-6 bg-primary text-2xl rounded-xl shadow-(--right-bottom-secondary-shadow)',
        'hover:outline-secondary hover:outline-2',
        'focus:outline-secondary focus:outline-2',
      ),
      dark: joinTw(
        'h-20 px-6 bg-secondary text-tertiary text-2xl shadow-(--right-bottom-accent-shadow) rounded-xl',
        'hover:outline-accent hover:outline-2',
        'focus:outline-accent focus:outline-2',
      ),
      accent: joinTw(
        'h-20 px-6 bg-accent text-secondary text-2xl shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'focus:outline-tertiary focus:outline-2',
      ),
      submit: '',
      table: joinTw(
        'flex flex-row items-center justify-center h-10 mx-auto py-4 bg-transparent text-secondary text-xl cursor-pointer',
        'hover:text-accent',
      ),
      destructive: joinTw(
        'h-20 px-6 bg-destructive text-tertiary text-2xl shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'hover:outline-secondary hover:outline-2',
        'focus:outline-secondary focus:outline-2',
      ),
      destructiveSlim: joinTw(
        'h-14 px-4 bg-destructive text-tertiary text-xl shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'hover:outline-secondary hover:outline-2',
        'focus:outline-secondary focus:outline-2',
      ),
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreButtonProps extends VariantProps<typeof coreButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The button's label.
   */
  readonly label: string | ReactNode;
}

/**
 * Renders the core button component used throughout the application.
 *
 * @param {CoreButtonProps} props
 * @return {JSX.Element}
 */
export const CoreButton = ({ label, disabled, intent, ...props }: CoreButtonProps): JSX.Element => {
  return (
    <button
      className={joinTw(
        coreButtonVariants({ intent }),
        disabled && 'text-tertiary cursor-not-allowed hover:outline-transparent',
      )}
      disabled={disabled}
      type={'button'}
      {...props}
    >
      {label}
    </button>
  );
};
