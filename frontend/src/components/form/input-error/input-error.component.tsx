/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

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
   * The rendered error message, if any.
   */
  readonly message: string | undefined;
}

/**
 * Renders a simple error message for various input fields.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const InputError = ({ message }: ComponentProps): JSX.Element => {
  return <Paragraph>{message}</Paragraph>;
};
