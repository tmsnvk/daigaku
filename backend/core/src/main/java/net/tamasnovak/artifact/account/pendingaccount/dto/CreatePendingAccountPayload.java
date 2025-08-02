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
  @NotBlank(message = "app.page.root.pendingAccountRegistration.form.firstNameRequired")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "app.page.root.pendingAccountRegistration.form.namePattern")
  String firstName,

  @NotBlank(message = "app.page.root.pendingAccountRegistration.form.lastNameRequired")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "app.page.root.pendingAccountRegistration.form.namePattern")
  String lastName,

  @Email(message = "app.page.root.pendingAccountRegistration.form.validEmailRequired")
  @NotBlank(message = "app.page.root.pendingAccountRegistration.form.emailRequired")
  String email,

  @ValidUuid(message = "app.page.root.pendingAccountRegistration.form.validInstitutionRequired")
  @NotBlank(message = "app.page.root.pendingAccountRegistration.form.institutionRequired")
  String institutionUuid,

  @ValidUuid(message = "app.page.root.pendingAccountRegistration.form.validAccountRoleRequired")
  @NotBlank(message = "app.page.root.pendingAccountRegistration.form.accountRoleRequired")
  String accountRoleUuid) {
  public UUID getInstituionUuid() {
    return UUID.fromString(institutionUuid);
  }

  public UUID getAccountRoleUuid() {
    return UUID.fromString(accountRoleUuid);
  }
}
