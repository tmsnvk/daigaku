package net.tamasnovak.security;

import java.util.List;

public record JwtResponse(
  String jwt,
  String email,
  List<String> roles
) {}
