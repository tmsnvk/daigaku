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

/* interfaces, types, enums */
interface ComponentProps {
  readonly message: string | undefined;
}

/**
 * @description
 * The component renders a simple error message for various input fields.
 *
 * @param {ComponentProps} props
 * @param props.message The rendered error message.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const InputError = ({ message }: ComponentProps): JSX.Element => {
  return <Paragraph>{message}</Paragraph>;
};
