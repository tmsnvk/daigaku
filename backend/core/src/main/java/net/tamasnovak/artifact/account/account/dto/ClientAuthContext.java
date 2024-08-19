package net.tamasnovak.artifact.account.account.dto;

public record ClientAuthContext(
  String email,
  String firstName,
  String role
) {}
