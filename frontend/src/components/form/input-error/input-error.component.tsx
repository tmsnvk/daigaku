/**
 * @prettier
 */

/* component, style imports */
import { Paragraph } from './input-error.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly errorText: string | undefined;
}

/*
 * component - TODO - add functionality description
 */
export const InputError = ({ errorText }: ComponentProps) => {
  return <Paragraph>{errorText}</Paragraph>;
};
