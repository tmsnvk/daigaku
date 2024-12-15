/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Paragraph } from './form-instruction.styles';

/**
 * ===============
 * Component {@link FormInstruction}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
 */
export const FormInstruction = ({ instructionText }: ComponentProps): JSX.Element => {
  return <Paragraph>{instructionText}</Paragraph>;
};
