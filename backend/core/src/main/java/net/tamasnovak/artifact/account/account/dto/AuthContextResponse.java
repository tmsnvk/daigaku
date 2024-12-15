/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

/**
 * Represents the authentication context details for the currently authenticated user.
 *
 * @param email The authenticated user's email.
 * @param firstName The authenticated user's first name.
 * @param role The authenticated user's authorisation role.
 * @since 0.0.1
 */
public record AuthContextResponse(
  String email,

  String firstName,

  String role
) {
}
