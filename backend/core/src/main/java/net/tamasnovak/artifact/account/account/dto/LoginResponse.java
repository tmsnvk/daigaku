/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

/**
 * Represents the response object returned after successful user login and authentication.
 *
 * @since 0.0.1
 */
public record LoginResponse(
  String email,

  String firstName,

  String role,

  String jwtToken
) {
}
