package net.tamasnovak.artifact.account.account.dto;

/**
 * Represents the response returned after successful user login and authentication.
 *
 * @since 0.0.1
 */
public record AuthResponse(
  String email,

  String firstName,

  String role,

  String jwtToken
) {
}
