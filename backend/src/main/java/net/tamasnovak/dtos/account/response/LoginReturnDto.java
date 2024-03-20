package net.tamasnovak.dtos.account.response;

import java.sql.Timestamp;

public record LoginReturnDto(
  String email,
  String firstName,
  String lastName,
  Timestamp registeredAt,
  Timestamp lastUpdatedAt,
  String jwtToken,
  String role
) {}
