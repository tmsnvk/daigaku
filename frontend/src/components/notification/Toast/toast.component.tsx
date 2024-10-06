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
import { Section } from './toast.styles.ts';

/**
 * ===============
 * Component {@link Toast}
 * ===============
 */

/**
 * @interface
 * @description
 * The interface represents the properties of the {@link Toast} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly message: string;
}

/**
 * @component
 * @description
 * The component renders a pop-up toast dialog as a feedback to the user.
 *
 * @param {ComponentProps} props
 * @param props.isVisible Boolean value to indicate whether the pop-up toast should be visible.
 * @param props.message The specific message to be displayed.
 *
 * @returns {JSX.Element | false}
 *
 * @since 0.0.1
 */
export const Toast = ({ isVisible, message }: ComponentProps): JSX.Element | false => {
  return isVisible && <Section>{message}</Section>;
};
