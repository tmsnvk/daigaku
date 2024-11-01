/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.dto;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;

/**
 * Represents the registration details for a new pending_account entity.
 *
 * @since 0.0.1
 */
public record PendingAccountRegistration(
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  String firstName,

  @NotBlank(message = "Provide a last name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  String lastName,

  @Email(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Select an institution.")
  @ValidUuid(message = "Select a valid institution.")
  String institutionUuid,

  @NotBlank(message = "Select an account role.")
  @ValidUuid(message = "Select a valid account role.")
  String accountRoleUuid) {
  public UUID getInstituionUuid() {
    return UUID.fromString(institutionUuid);
  }

  public UUID getAccountRoleUuid() {
    return UUID.fromString(accountRoleUuid);
  }
}
