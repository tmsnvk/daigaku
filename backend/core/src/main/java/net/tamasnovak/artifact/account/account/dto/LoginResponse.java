package net.tamasnovak.artifact.account.account.dto;

public record LoginResponse(
  String email,
  String firstName,
  String role,
  String jwtToken
) {}
