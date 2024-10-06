/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* component, style imports */
import { Label } from './input-label.styles';

/**
 * ===============
 * Component {@link InputLabel}
 * ===============
 */

/**
 * @interface
 * @description
 * The interface represents the properties of the {@link InputLabel} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly inputId: string;
  readonly labelText: string;
}

/**
 * @component
 * @description
 * The component renders a list of paragraphs for a given input field.
 *
 * @param {ComponentProps} props
 * @param props.inputId The id of the input field that the label is associated with.
 * @param props.labelText The text to display inside the label.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const InputLabel = ({ inputId, labelText }: ComponentProps): JSX.Element => {
  return <Label htmlFor={inputId}>{labelText}</Label>;
};
