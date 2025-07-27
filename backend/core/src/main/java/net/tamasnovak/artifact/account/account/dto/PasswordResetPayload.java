/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents a request for account password reset.
 *
 * @param email The account's email.
 */
public record PasswordResetPayload(
  @Email(message = "Provide a valid email address.")
  @NotBlank(message = "Providing your email address is required.")
  String email
) {
}
