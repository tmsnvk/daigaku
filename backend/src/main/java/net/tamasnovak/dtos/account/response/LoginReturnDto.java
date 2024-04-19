package net.tamasnovak.dtos.account.response;

public record LoginReturnDto(
  String email,
  String firstName,
  String role,
  String jwtToken
) {}
