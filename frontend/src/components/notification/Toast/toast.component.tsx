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

/* interfaces, types, enums */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly message: string;
}

/*
 * component - TODO - add functionality description
 */
export const Toast = ({ isVisible, message }: ComponentProps) => {
  return isVisible && <Section>{message}</Section>;
};
