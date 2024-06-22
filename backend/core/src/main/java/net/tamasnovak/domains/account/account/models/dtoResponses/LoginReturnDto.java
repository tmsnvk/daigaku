package net.tamasnovak.domains.account.account.models.dtoResponses;

public record LoginReturnDto(
  String email,
  String firstName,
  String role,
  String jwtToken
) {}
