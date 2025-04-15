/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactNode } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreDialogVariants = cva(
  joinTw(
    'core-loading-dialog-window',
    'w-8/10 sm:w-6/10 xl:w-3/10 my-[15%] mx-auto p-6 flex justify-center px-10 text-2xl rounded-xl tracking-wide leading-10',
    'focus:outline-2',
  ),
  {
    variants: {
      intent: {
        light: 'bg-tertiary text-secondary shadow-(--right-bottom-secondary-shadow) focus:outline-secondary',
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface CoreDialogProps extends VariantProps<typeof coreDialogVariants> {
  /**
   *
   */
  readonly ref: React.Ref<HTMLDialogElement>;

  /**
   */
  readonly children: ReactNode;

  /**
   * The button's additional style options.
   */
  readonly className?: string;
}

/**
 * Renders the core dialog component used throughout the application.
 *
 * @param {CoreDialogProps} props
 * @return {JSX.Element}
 */
export const CoreDialog = ({ ref, children, intent, className }: CoreDialogProps): JSX.Element => {
  return (
    <dialog
      ref={ref}
      className={joinTw(coreDialogVariants({ intent, className }))}
    >
      {children}
    </dialog>
  );
};
