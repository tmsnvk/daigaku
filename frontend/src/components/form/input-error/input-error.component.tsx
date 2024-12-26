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
import { Paragraph } from './input-error.styles';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The error message to be displayed, if there is any.
   */
  readonly message: string | undefined;
}

/**
 * Renders a simple error message for various input fields.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const InputError = ({ message }: ComponentProps): JSX.Element => {
  return <Paragraph>{message}</Paragraph>;
};
