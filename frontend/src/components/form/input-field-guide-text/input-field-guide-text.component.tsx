/**
 * @prettier
 */

/* component, style imports */
import { Article } from './input-field-guide-text.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly content: Array<string>;
}

/*
 * component - TODO - add functionality description
 */
export const InputFieldGuideText = ({ content }: ComponentProps) => {
  return (
    <Article>
      {content.map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Article>
  );
};
