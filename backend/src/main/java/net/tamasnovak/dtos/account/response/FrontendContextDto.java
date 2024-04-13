package net.tamasnovak.dtos.account.response;

import java.sql.Timestamp;

public record FrontendContextDto(
  String email,
  String firstName,
  String lastName,
  Timestamp registeredAt,
  Timestamp lastUpdatedAt,
  String role
) {}
