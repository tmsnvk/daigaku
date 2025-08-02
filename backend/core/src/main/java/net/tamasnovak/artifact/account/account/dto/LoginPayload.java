/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents a request for account login.
 * The record ensures the validation of all of its fields. Also, it provides a factory method to standardize the email format before it
 * gets saved in the application's database.
 *
 * @param email The account's email.
 * @param password The account's password.
 */
public record LoginPayload(
  @Email(message = "app.page.root.login.form.validEmailRequired")
  @NotBlank(message = "app.page.root.login.form.emailRequired")
  String email,

  @NotBlank(message = "app.page.root.login.form.passwordRequired")
  String password
) {
  /**
   * Creates a new instance of {@link LoginPayload} with the email field converted to lowercase.
   *
   * @param email The account's email that will be converted to lowercase.
   * @param password The account's password.
   * @return {@link LoginPayload}.
   */
  public static LoginPayload of(String email, final String password) {
    return new LoginPayload(email.toLowerCase(), password);
  }
}
