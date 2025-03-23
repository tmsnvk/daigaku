/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/**
 * Defines the component's properties.
 */
interface CoreInputLabelProps {
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
 * @param {CoreInputLabelProps} props
 * @return {JSX.Element}
 */
export const CoreInputLabel = ({ inputId, content }: CoreInputLabelProps): JSX.Element => {
  return (
    <label
      htmlFor={inputId}
      className={'text-2xl'}
    >
      {content}
    </label>
  );
};
