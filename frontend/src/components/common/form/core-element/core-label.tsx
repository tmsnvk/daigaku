/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface CoreLabelProps {
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
  readonly error: boolean;
}

/**
 * Renders a label element for the input group component associated with the provided input element id.
 *
 * @param {CoreLabelProps} props
 * @return {JSX.Element}
 */
export const CoreLabel = ({ inputId, label, error }: CoreLabelProps): JSX.Element => {
  return (
    <label
      className={joinTw(
        'z-1 rounded-(--default-border-radius) absolute top-[-0.75rem] ml-6 px-4 text-lg font-semibold tracking-widest',
        error ? 'bg-destructive text-tertiary' : 'bg-secondary text-primary',
      )}
      htmlFor={inputId}
    >
      {label}
    </label>
  );
};
