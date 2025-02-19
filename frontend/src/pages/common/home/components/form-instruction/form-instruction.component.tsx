/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Paragraph } from './form-instruction.styles';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The instruction text to be displayed.
   */
  readonly instructionText: string;
}

/**
 * Renders the instruction text of the given form component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const FormInstruction = ({ instructionText }: ComponentProps): JSX.Element => {
  return <Paragraph>{instructionText}</Paragraph>;
};
