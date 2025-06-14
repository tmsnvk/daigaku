/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.dto;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;

/**
 * Represents the registration details for a new {@link PendingAccount} entity.
 *
 * @param firstName The pending account's first name.
 * @param lastName The pending account's last name.
 * @param email The pending account's email.
 * @param institutionUuid The pending account's institution uuid string.
 * @param accountRoleUuid The pending account's authorization role uuid string.
 */
public record CreatePendingAccountPayload(
  @NotBlank(message = "Provide your first name(s). Use only letters, hyphens and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "Use only letters and spaces. Provide a minimum of 1 and a maximum of 255 characters.")
  String firstName,

  @NotBlank(message = "Provide your last name(s). Use only letters, hyphens and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "Use only letters and spaces. Provide a minimum of 1 and a maximum of 255 characters.")
  String lastName,

  @Email(message = "Provide your email address.")
  @NotBlank(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Select an institution.")
  @ValidUuid(message = "Select a valid institution.")
  String institutionUuid,

  @NotBlank(message = "Select an account type.")
  @ValidUuid(message = "Select a valid account type.")
  String accountRoleUuid) {
  public UUID getInstituionUuid() {
    return UUID.fromString(institutionUuid);
  }

  public UUID getAccountRoleUuid() {
    return UUID.fromString(accountRoleUuid);
  }
}
