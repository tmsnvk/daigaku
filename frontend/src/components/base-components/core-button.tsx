/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, JSX, MouseEventHandler } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreButtonVariants = cva(joinTw('h-20 px-6 text-2xl font-bold rounded-xl tracking-widest', 'focus:outline-2', 'hover:outline-2'), {
  variants: {
    intent: {
      light: 'bg-primary shadow-(--right-bottom-secondary-shadow) hover:outline-secondary focus:outline-secondary',
      dark: 'bg-secondary text-tertiary shadow-(--right-bottom-accent-shadow) focus:outline-accent hover:outline-accent',
      accent: 'bg-accent text-secondary focus:outline-tertiary shadow-(--right-bottom-secondary-shadow)',
      submit: '',
      destructive: 'bg-destructive text-tertiary shadow-(--right-bottom-secondary-shadow) hover:outline-secondary focus:outline-secondary',
      disabled: '',
    },
    isDisabled: {
      false: 'cursor-pointer',
      true: 'cursor-not-allowed',
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
  readonly label: string;

  /**
   * The boolean indicating whether the button is disabled or not.
   */
  readonly isDisabled?: boolean;

  /**
   * The button's additional style options.
   */
  readonly className?: string;

  /**
   * The button's onClick handler.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Renders the core button component used throughout the application.
 *
 * @param {CoreButtonProps} props
 * @return {JSX.Element}
 */
export const CoreButton = ({ intent, label, isDisabled, className, onClick }: CoreButtonProps): JSX.Element => {
  return (
    <button
      id={label}
      name={label}
      className={joinTw(coreButtonVariants({ intent, isDisabled, className }))}
      type={'button'}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};
