/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents a request for user login.
 * The record ensures the validation of all of its fields. Also, it provides a factory method to standardise the email format before it
 * gets saved in the application's database.
 *
 * @param email The user's email.
 * @param password The user's password.
 * @since 0.0.1
 */
public record LoginRequest(
  @Email(message = "Provide a valid email address.")
  @NotBlank(message = "Provide an email address.")
  String email,

  @NotBlank(message = "Provide your password.")
  String password
) {
  /**
   * Creates a new instance of {@link LoginRequest} with the email field converted to lowercase.
   *
   * @param email The user's email that will be converted to lowercase.
   * @param password The user's password.
   * @return {@link LoginRequest}.
   */
  public static LoginRequest of(String email, final String password) {
    return new LoginRequest(email.toLowerCase(), password);
  }
}
