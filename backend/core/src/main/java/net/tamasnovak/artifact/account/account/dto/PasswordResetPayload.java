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
  @Email(message = "app.page.root.passwordReset.form.validEmailRequired")
  @NotBlank(message = "app.page.root.passwordReset.form.emailRequired")
  String email
) {
}
