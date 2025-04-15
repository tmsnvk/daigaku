/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Formats the role name by removing the "ROLE_" prefix and converting it to lowercase.
 *
 * @param role The raw role name to be formatted.
 * @return {string} The formatted role name.
 */
export const removeRolePrefix = (role: string): string => {
  return role.replace(/^ROLE_/, '').toLowerCase();
};
