package net.tamasnovak.artifact.account.pendingaccount.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.validation.annotations.validuuid.ValidUUID;

import java.util.UUID;

public record PendingAccountRegistration(
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  String firstName,

  @NotBlank(message = "Provide a last name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  String lastName,

  @Email(message = "Provide a valid email address.")
  String email,

  @NotNull(message = "Select an institution.")
  @ValidUUID(message = "Provide a valid institution.")
  UUID institutionUuid,

  @NotNull(message = "Select an account role.")
  @ValidUUID(message = "Select a valid account role.")
  UUID accountRoleUuid
) {}
