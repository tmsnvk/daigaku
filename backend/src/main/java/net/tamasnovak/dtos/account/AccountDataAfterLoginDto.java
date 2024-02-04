package net.tamasnovak.dtos.account;

import net.tamasnovak.security.JwtResponse;

import java.sql.Timestamp;

public record AccountDataAfterLoginDto(
  String email,
  String firstName,
  String lastName,
  Timestamp registeredAt,
  Timestamp lastUpdatedAt,
  JwtResponse jwtResponse
) {}
