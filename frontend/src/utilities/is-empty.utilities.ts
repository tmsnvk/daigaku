/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Provides a simple and reliable way to check for 'emptiness' regardless of the data type.
 *
 * @param value The value to be checked.
 * @returns {boolean} A boolean value.
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};
