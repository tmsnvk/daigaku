/**
 * @prettier
 */

import { Section } from './toast.styles.ts';

interface ComponentProps {
  readonly isVisible: boolean;
  readonly content: string;
}

export const Toast = ({ isVisible, content }: ComponentProps) => {
  return isVisible && <Section>{content}</Section>;
};
