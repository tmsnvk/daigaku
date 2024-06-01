package net.tamasnovak.domains.account.account.models.dtoResponses;

public record ClientAuthContextDto(
  String email,
  String firstName,
  String role
) {}
