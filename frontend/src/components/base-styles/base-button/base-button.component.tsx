/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, MouseEventHandler } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const buttonVariants = cva(
  'h-20 px-6 text-2xl font-bold rounded-xl focus:outline-2 focus:outline-solid hover:outline-2 hover:outline-solid tracking-widest',
  {
    variants: {
      intent: {
        light: 'bg-primary shadow-(--right-bottom-secondary-shadow) hover:outline-secondary focus:outline-secondary',
        dark: 'bg-secondary text-tertiary shadow-(--right-bottom-accent-shadow) focus:outline-accent hover:outline-accent',
        accent: 'bg-accent text-secondary focus:outline-tertiary shadow-(--right-bottom-secondary-shadow)',
        destructive:
          'bg-destructive text-tertiary shadow-(--right-bottom-secondary-shadow) hover:outline-secondary focus:outline-secondary',
        disabled: '',
      },
      disabled: {
        false: 'cursor-pointer',
        true: 'cursor-not-allowed disabled:outline-0',
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface ComponentProps extends VariantProps<typeof buttonVariants> {
  /**
   * The button's label.
   */
  readonly label: string;

  /**
   * The button's additional style options.
   */
  readonly className?: string;

  /**
   * The boolean indicating whether the button is disabled or not.
   */
  readonly disabled?: boolean;

  /**
   * The button's onClick handler.
   */
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Renders the default button component used throughout the application.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const BaseButton = ({ label, intent, className, disabled, onClickHandler }: ComponentProps): JSX.Element => {
  return (
    <button
      id={label}
      name={label}
      className={joinTw(buttonVariants({ intent, disabled, className }))}
      type={'button'}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
