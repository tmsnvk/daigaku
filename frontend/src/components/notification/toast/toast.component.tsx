/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';

/* component, style imports */
import { Section } from './toast.styles.ts';

/**
 * ===============
 * Component {@link Toast}
 * ===============
 */

/**
 * Defines the properties of the {@link Toast} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
 */
export const Toast = ({ isVisible, message }: ComponentProps): JSX.Element | null => {
  return isVisible ? <Section>{message}</Section> : null;
};
