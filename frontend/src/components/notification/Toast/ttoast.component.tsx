/**
 * @prettier
 */

/* component, style imports */
import { Section } from './ttoast.styles.ts';

/* interfaces, types, enums */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly message: string;
}

/*
 * component - TODO - add functionality description
 */
export const Toast = ({ isVisible, message }: ComponentProps) => {
  return isVisible && <Section>{message}</Section>;
};
