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
  readonly paragraph: string;

  /**
   * Optional style settings.
   */
  readonly className?: string;
}

/**
 * Renders an instruction paragraph for a given input form element.
 *
 * @param {CoreFormElementInstructionProps} props
 * @return {JSX.Element}
 */
export const CoreFormElementInstruction = ({ paragraph, className }: CoreFormElementInstructionProps): JSX.Element => {
  return (
    <article
      className={joinTw(
        'px-6 py-10',
        'bg-primary border-secondary border-2',
        'rounded-(--default-border-radius)',
        className,
      )}
    >
      <p className={joinTw('mb-1', 'text-xl', 'last-of-type:mb-0')}>{paragraph}</p>
    </article>
  );
};
