/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface ToastProps {
  /**
   * Indicates whether the component should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The specific error message to be displayed.
   */
  readonly message: string;

  /**
   * A callback method that handles the animation end of the component.
   */
  onAnimationEnd?: () => void;
}

/**
 * Renders a pop-up toast dialog as a feedback to the user.
 *
 * @param {ToastProps} props
 * @return {JSX.Element | null}
 */
export const Toast = ({ isVisible, message, onAnimationEnd }: ToastProps): JSX.Element | null => {
  return isVisible ? (
    <section
      onAnimationEnd={onAnimationEnd}
      className={joinTw(
        'core-primary-border bg-accent z-100 fixed h-40 w-80 overflow-visible',
        'flex items-center justify-center',
        'bottom-40 px-6 text-2xl',
        'animate-simple-fade-out',
      )}
    >
      {message}
    </section>
  ) : null;
};
