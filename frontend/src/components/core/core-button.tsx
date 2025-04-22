/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, JSX, MouseEventHandler, ReactNode } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreButtonVariants = cva(joinTw('font-bold tracking-widest cursor-pointer'), {
  variants: {
    intent: {
      light: joinTw(
        'h-20',
        'px-6',
        'bg-primary',
        'text-2xl',
        'shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'hover:outline-secondary hover:outline-2',
        'focus:outline-secondary focus:outline-2',
      ),
      dark: joinTw(
        'h-20',
        'px-6',
        'bg-secondary',
        'text-tertiary text-2xl',
        'shadow-(--right-bottom-accent-shadow) rounded-xl',
        'hover:outline-accent hover:outline-2',
        'focus:outline-accent focus:outline-2',
      ),
      accent: joinTw(
        'h-20',
        'px-6',
        'bg-accent',
        'text-secondary text-2xl',
        'shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'focus:outline-tertiary focus:outline-2',
      ),
      submit: '',
      table: joinTw(
        'flex flex-row items-center justify-center',
        'h-10',
        'mx-auto py-4',
        'bg-transparent',
        'text-secondary text-xl',
        'cursor-pointer',
        'hover:text-accent',
      ),
      destructive: joinTw(
        'h-20',
        'px-6',
        'bg-destructive',
        'text-tertiary text-2xl',
        'shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'hover:outline-secondary hover:outline-2',
        'focus:outline-secondary focus:outline-2',
      ),
      destructiveSlim: joinTw(
        'h-14',
        'px-4',
        'bg-destructive',
        'text-tertiary text-xl',
        'shadow-(--right-bottom-secondary-shadow) rounded-xl',
        'hover:outline-secondary hover:outline-2',
        'focus:outline-secondary focus:outline-2',
      ),
    },
    isDisabled: {
      true: joinTw('text-tertiary', 'cursor-not-allowed', 'hover:outline-transparent'),
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreButtonProps
  extends VariantProps<typeof coreButtonVariants>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {
  /**
   * The button's label.
   */
  readonly label: string;

  /**
   * Optional property, used when a button's label is not a string but a more complex node.
   */
  readonly content?: ReactNode;

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
export const CoreButton = ({
  intent,
  content,
  label,
  isDisabled = false,
  className,
  onClick,
}: CoreButtonProps): JSX.Element => {
  return (
    <button
      id={label}
      name={label}
      className={joinTw(coreButtonVariants({ intent, isDisabled }), className)}
      type={'button'}
      onClick={onClick}
      disabled={isDisabled}
    >
      {content ?? label}
    </button>
  );
};
