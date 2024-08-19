package net.tamasnovak.domain.account.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
  @Email(message = "Provide a valid email address.")
  String email,

  @NotBlank(message = "Provide your password.")
  String password
) {}
