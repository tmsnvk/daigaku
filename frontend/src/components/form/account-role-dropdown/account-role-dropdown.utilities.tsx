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
 * Formats the role name by removing the prefix "ROLE_" and converting it to lowercase.
 *
 * @param roleName The raw role name to be formatted.
 * @return {string} The formatted role name.
 *
 * @since 0.0.1
 */
export const formatRoleName = (roleName: string): string => {
  return roleName.replace(/^ROLE_/, '').toLowerCase();
};
