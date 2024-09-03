/**
 * @prettier
 */

/* component, style imports */
import { Paragraph } from './form-instruction.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly content: string;
}

/*
 * component - TODO - add functionality description
 */
export const FormInstruction = ({ content }: ComponentProps) => {
  return <Paragraph>{content}</Paragraph>;
};
