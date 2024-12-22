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
 * Defines the properties of the {@link Toast} component.
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
}

/**
 * Renders a pop-up toast dialog as a feedback to the user.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element | null}
 */
export const Toast = ({ isVisible, message }: ComponentProps): JSX.Element | null => {
  return isVisible ? <Section>{message}</Section> : null;
};
