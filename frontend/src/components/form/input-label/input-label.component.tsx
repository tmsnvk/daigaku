/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Label } from './input-label.styles';

/**
 * ===============
 * Component {@link InputLabel}
 * ===============
 */

/**
 * Defines the properties of the {@link InputLabel} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The id of the associated input element.
   */
  readonly inputId: string;

  /**
   * The text displayed inside the label.
   */
  readonly labelText: string;
}

/**
 * Renders a label for an input field, associated with the specified input id.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const InputLabel = ({ inputId, labelText }: ComponentProps): JSX.Element => {
  return <Label htmlFor={inputId}>{labelText}</Label>;
};
