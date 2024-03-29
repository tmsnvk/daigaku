package net.tamasnovak.dtos.account.response;

import java.sql.Timestamp;

public record GetMeDto(
  String email,
  String firstName,
  String lastName,
  Timestamp registeredAt,
  Timestamp lastUpdatedAt,
  String role
) {}
