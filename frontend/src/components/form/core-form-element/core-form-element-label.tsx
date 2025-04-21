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
interface CoreFormElementLabelProps {
  /**
   * The associated input element's id.
   */
  readonly inputId: string;

  /**
   * The displayed label string.
   */
  readonly content: string;
}

/**
 * Renders a label element for the input group component associated with the provided input element id.
 *
 * @param {CoreFormElementLabelProps} props
 * @return {JSX.Element}
 */
export const CoreFormElementLabel = ({ inputId, content }: CoreFormElementLabelProps): JSX.Element => {
  return (
    <label
      htmlFor={inputId}
      className={joinTw('text-2xl')}
    >
      {content}
    </label>
  );
};
