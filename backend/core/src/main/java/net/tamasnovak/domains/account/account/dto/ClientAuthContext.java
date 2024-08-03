package net.tamasnovak.domains.account.account.dto;

public record ClientAuthContext(
  String email,
  String firstName,
  String role
) {}
