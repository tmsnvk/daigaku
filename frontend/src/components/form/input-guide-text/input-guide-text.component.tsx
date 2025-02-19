/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Article } from './input-guide-text.styles';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * An array of strings representing the instruction paragraphs to be displayed.
   */
  readonly paragraphs: Array<string>;
}

/**
 * Renders a list of instruction paragraphs for a given input field.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const InputGuideText = ({ paragraphs }: ComponentProps): JSX.Element => {
  return (
    <Article>
      {paragraphs.map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Article>
  );
};
