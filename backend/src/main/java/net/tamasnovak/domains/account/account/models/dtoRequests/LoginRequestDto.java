package net.tamasnovak.domains.account.account.models.dtoRequests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
  @Email(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Provide your password.")
  String password
) {}
