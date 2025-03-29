/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

/**
 * Defines the component's properties.
 */
interface CoreFormElementInstructionProps {
  /**
   * An array of strings representing the instruction paragraphs to be displayed.
   */
  readonly paragraphs: Array<string>;
}

/**
 * Renders a list of instruction paragraphs for a given input form element.
 *
 * @param {CoreFormElementInstructionProps} props
 * @return {JSX.Element}
 */
export const CoreFormElementInstruction = ({ paragraphs }: CoreFormElementInstructionProps): JSX.Element => {
  return (
    <article className={joinTw('px-6 py-10 bg-primary border-2 border-secondary rounded-(--default-border-radius)')}>
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
