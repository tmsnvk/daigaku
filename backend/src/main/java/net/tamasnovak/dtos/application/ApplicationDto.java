package net.tamasnovak.dtos.application;

import java.sql.Timestamp;
import java.util.UUID;

public record ApplicationDto(
  UUID id,
  UUID account,
  String country,
  String university,
  String courseName,
  String minorSubject,
  int programmeLength,
  String applicationStatus,
  String interviewStatus,
  String offerStatus,
  String responseStatus,
  String finalDestinationStatus,
  String notes,
  Timestamp createdAt,
  Timestamp lastUpdatedAt
) {}
