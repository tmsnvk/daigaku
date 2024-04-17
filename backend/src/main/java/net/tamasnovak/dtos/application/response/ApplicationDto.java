package net.tamasnovak.dtos.application.response;

import java.sql.Timestamp;
import java.util.UUID;

public record ApplicationDto(
  UUID uuid,
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
  Timestamp createdAt,
  Timestamp lastUpdatedAt,
  String createdBy,
  String lastModifiedBy
) {}
