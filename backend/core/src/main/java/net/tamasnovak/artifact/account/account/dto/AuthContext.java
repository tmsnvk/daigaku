package net.tamasnovak.artifact.account.account.dto;

/**
 * Represents the authentication context for a user.
 * It is used on the frontend to validate that the user is still logged in.
 *
 * @since 0.0.1
 */
public record AuthContext(
  String email,

  String firstName,

  String role
) {
}
