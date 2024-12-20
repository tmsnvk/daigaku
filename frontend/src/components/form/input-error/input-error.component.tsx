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
import { Paragraph } from './input-error.styles';

/**
 * ===============
 * Component {@link InputError}
 * ===============
 */

/**
 * Defines the properties of the {@link InputError} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The error message to be displayed. If there is no error, this should be undefined.
   */
  readonly message: string | undefined;
}

/**
 * Renders an error message for various input fields.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const InputError = ({ message }: ComponentProps): JSX.Element => {
  return <Paragraph>{message}</Paragraph>;
};
