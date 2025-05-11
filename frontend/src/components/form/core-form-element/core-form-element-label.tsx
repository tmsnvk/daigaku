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
  readonly label: string;

  /**
   * Indicates whether there is an error involving the input element.
   */
  readonly isError?: boolean;
}

/**
 * Renders a label element for the input group component associated with the provided input element id.
 *
 * @param {CoreFormElementLabelProps} props
 * @return {JSX.Element}
 */
export const CoreFormElementLabel = ({ inputId, label, isError }: CoreFormElementLabelProps): JSX.Element => {
  return (
    <label
      htmlFor={inputId}
      className={joinTw(
        'z-1 absolute top-[-0.75rem]',
        'ml-6 px-4',
        'text-lg font-semibold tracking-widest',
        'rounded-(--default-border-radius)',
        isError ? 'bg-destructive text-tertiary' : 'bg-secondary text-primary',
      )}
    >
      {label}
    </label>
  );
};
