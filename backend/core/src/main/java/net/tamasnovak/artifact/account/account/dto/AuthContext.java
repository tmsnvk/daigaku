/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

/**
 * Represents the authentication context for a user.
 *
 * @since 0.0.1
 */
public record AuthContext(
  String email,

  String firstName,

  String role
) {
}
