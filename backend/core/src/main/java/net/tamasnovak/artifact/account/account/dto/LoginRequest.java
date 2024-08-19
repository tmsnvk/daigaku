package net.tamasnovak.artifact.account.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
  @Email(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Provide your password.")
  String password
) {
  public static LoginRequest of(String email, final String password) {
    final String lowerCaseEmail = email != null ? email.toLowerCase() : null;

    return new LoginRequest(lowerCaseEmail, password);
  }
}
