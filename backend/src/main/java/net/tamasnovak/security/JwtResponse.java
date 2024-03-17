package net.tamasnovak.security;

public record JwtResponse(
  String jwt,
  String email,
  String role
) {}
