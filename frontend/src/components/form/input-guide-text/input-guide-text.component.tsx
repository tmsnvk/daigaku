/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { joinTw } from '@utilities';
import { JSX } from 'react';

/* component, style imports */

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * An array of strings representing the instruction paragraphs to be displayed.
   */
  readonly paragraphs: Array<string>;

  /**
   * Additional styling options.
   */
  readonly className?: string;
}

/**
 * Renders a list of instruction paragraphs for a given input field.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const InputGuideText = ({ className, paragraphs }: ComponentProps): JSX.Element => {
  return (
    <article
      className={joinTw('px-6 py-10 bg-primary border-2 border-solid border-secondary rounded-(--default-border-radius)', className)}
    >
      {paragraphs.map((paragraph: string, index: number) => (
        <p
          key={index}
          className={'mb-1 text-xl last-of-type:mb-0'}
        >
          {paragraph}
        </p>
      ))}
    </article>
  );
};
