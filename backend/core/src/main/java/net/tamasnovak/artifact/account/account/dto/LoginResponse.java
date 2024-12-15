/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

/**
 * Represents the response object returned to the frontend after a successful user login and authentication.
 *
 * @param email The authenticated user's email address.
 * @param firstName The authenticated user's first name.
 * @param role The role of the authenticated user, defining their access level.
 * @param jwtToken The authenticated user's assigned JWT token.
 * @since 0.0.1
 */
public record LoginResponse(
  String email,

  String firstName,

  String role,

  String jwtToken
) {
}
