package net.tamasnovak.dtos.application.response.applicationView;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

public record MappedApplicationView(
  UUID uuid,
  UUID accountUuid,
  String country,
  String university,
  String courseName,
  String minorSubject,
  Integer programmeLength,
  String applicationStatus,
  String interviewStatus,
  String offerStatus,
  String responseStatus,
  String finalDestinationStatus,
  Instant createdAt,
  Instant lastUpdatedAt,
  String createdBy,
  String lastModifiedBy,
  boolean isRemovable
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
