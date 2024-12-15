/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Formats the role name by removing the "ROLE_" prefix and converting it to lowercase.
 *
 * @param roleName The raw role name to be formatted.
 * @return {string} The formatted role name.
 *
 * @since 0.0.1
 */
export const formatRoleName = (roleName: string): string => {
  return roleName.replace(/^ROLE_/, '').toLowerCase();
};
