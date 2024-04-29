package net.tamasnovak.dtos.account.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PendingAccountRegistrationDto(
  @NotBlank(message = "Provide a first name.")
  @Size(min = 2, max = 100, message = "First name(s) should be between 2 and 100 characters long.")
  String firstName,
  @NotBlank(message = "Provide a first name.")
  @Size(min = 2, max = 100, message = "Last name(s) should be between 2 and 100 characters long.")
  String lastName,
  @Email(message = "Provide a valid email address.")
  String email,
  @NotBlank(message = "Select a valid institution.")
  String institutionUuid
) {}
