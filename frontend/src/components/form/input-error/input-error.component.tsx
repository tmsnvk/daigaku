/**
 * @prettier
 */

import { Paragraph } from './input-error.styles';

interface ComponentProps {
  readonly content: string;
}

export const InputError = ({ content }: ComponentProps) => {
  return <Paragraph>{content}</Paragraph>;
};
