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

/**
 * Returns the current year as a string in YYYY format.
 *
 * @return {string}
 *
 * @since 0.0.1
 */
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};
