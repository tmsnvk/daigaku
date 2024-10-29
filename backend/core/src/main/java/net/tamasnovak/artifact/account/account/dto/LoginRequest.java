package net.tamasnovak.artifact.account.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents a request for user login.
 *
 * @since 0.0.1
 */
public record LoginRequest(
  @Email(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Provide your password.")
  String password
) {
  /**
   * Creates a new instance of {@link LoginRequest} with a lowercase email.
   *
   * @param email The email of the user that will be converted to lowercase.
   * @param password The password of the user.
   * @return {@link LoginRequest}
   */
  public static LoginRequest of(String email, final String password) {
    final String lowerCaseEmail = email != null ? email.toLowerCase() : null;

    return new LoginRequest(lowerCaseEmail, password);
  }
}
