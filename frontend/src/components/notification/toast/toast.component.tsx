/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Section } from './toast.styles.ts';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
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
 * @param {ComponentProps} props
 * @return {JSX.Element | null}
 */
export const Toast = ({ isVisible, message, onAnimationEnd }: ComponentProps): JSX.Element | null => {
  return isVisible ? <Section onAnimationEnd={onAnimationEnd}>{message}</Section> : null;
};
