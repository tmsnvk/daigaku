package net.tamasnovak.dtos.account.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.annotations.uuidConstraint.UuidConstraint;

public record PendingAccountRegistrationDto(
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  String firstName,

  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  String lastName,

  @Email(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Select an institution.")
  @UuidConstraint(message = "Provide a valid institution.")
  String institutionUuid,

  @NotBlank(message = "Select an account role.")
  @UuidConstraint(message = "Select a valid account role.")
  String accountRoleUuid
) {}
