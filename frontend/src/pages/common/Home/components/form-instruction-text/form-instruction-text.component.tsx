/**
 * @prettier
 */

import { Paragraph } from './form-instruction-text.styles';

interface ComponentProps {
  readonly content: string;
}

export const FormInstructionText = ({ content }: ComponentProps) => {
  return <Paragraph>{content}</Paragraph>;
};
