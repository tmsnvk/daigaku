/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Returns the current year as a string in YYYY format.
 *
 * @return {string}
 */
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};
