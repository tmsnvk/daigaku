/**
 * @prettier
 */

/* component, style imports */
import { Paragraph } from './input-error.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly message: string;
}

/*
 * component - TODO - add functionality description
 */
export const InputError = ({ message }: ComponentProps) => {
  return <Paragraph>{message}</Paragraph>;
};
