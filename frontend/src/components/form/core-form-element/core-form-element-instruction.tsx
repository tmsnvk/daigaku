/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface CoreFormElementInstructionProps {
  /**
   * An array of strings representing the instruction paragraphs to be displayed.
   */
  readonly paragraphs: Array<string>;

  /**
   * Optional style settings.
   */
  readonly className?: string;
}

/**
 * Renders a list of instruction paragraphs for a given input form element.
 *
 * @param {CoreFormElementInstructionProps} props
 * @return {JSX.Element}
 */
export const CoreFormElementInstruction = ({ paragraphs, className }: CoreFormElementInstructionProps): JSX.Element => {
  return (
    <article
      className={joinTw(
        'px-6 py-10',
        'bg-primary border-secondary border-2',
        'rounded-(--default-border-radius)',
        className,
      )}
    >
      {paragraphs.map((p: string, idx: number) => (
        <p
          key={idx}
          className={joinTw('mb-1', 'text-xl', 'last-of-type:mb-0')}
        >
          {p}
        </p>
      ))}
    </article>
  );
};
