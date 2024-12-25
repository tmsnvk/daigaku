/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Label } from './input-label.styles';

/**
 * Defines the properties of the {@link InputLabel} component.
 */
interface ComponentProps {
  /**
   * The id of the associated input element.
   */
  readonly inputId: string;

  /**
   * The text displayed inside the label.
   */
  readonly label: string;
}

/**
 * Renders a label for an input field, associated with the specified input id.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const InputLabel = ({ inputId, label }: ComponentProps): JSX.Element => {
  return <Label htmlFor={inputId}>{label}</Label>;
};
