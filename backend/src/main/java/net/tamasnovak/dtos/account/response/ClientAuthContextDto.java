package net.tamasnovak.dtos.account.response;

public record ClientAuthContextDto(
  String email,
  String firstName,
  String role
) {}
