/**
 * @prettier
 */

/* component, style imports */
import { Paragraph } from './form-instruction-text.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly content: string;
}

/*
 * component - TODO - add functionality description
 */
export const FormInstructionText = ({ content }: ComponentProps) => {
  return <Paragraph>{content}</Paragraph>;
};
