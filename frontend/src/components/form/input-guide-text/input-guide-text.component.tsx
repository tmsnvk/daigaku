/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';

/* component, style imports */
import { Article } from './input-guide-text.styles';

/**
 * ===============
 * Component {@link InputGuideText}
 * ===============
 */

/**
 * Defines the properties of the {@link InputGuideText} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * An array of strings representing the instruction paragraphs to be displayed.
   */
  readonly paragraphs: Array<string>;
}

/**
 * Renders a list of instruction paragraphs for a given input.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
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
