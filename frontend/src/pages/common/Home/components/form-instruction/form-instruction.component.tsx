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
import { Paragraph } from './form-instruction.styles';

/**
 * ===============
 * Component {@link FormInstruction}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly instructionText: string;
}

/**
 * @description
 * The component responsible for showing the instruction text of the given form component.
 *
 * @param {string} props.instructionText
 * The instruction text to be displayed.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const FormInstruction = ({ instructionText }: ComponentProps): JSX.Element => {
  return <Paragraph>{instructionText}</Paragraph>;
};
