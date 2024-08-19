package net.tamasnovak.domain.application.shared.dto;

import net.tamasnovak.domain.application.shared.persistence.ApplicationView;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

public record ApplicationData(
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
  Timestamp createdAt,
  Timestamp lastUpdatedAt,
  String createdBy,
  String lastModifiedBy,
  boolean isRemovable
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  public ApplicationData(ApplicationView applicationView) {
    this(
      applicationView.getUuid(),
      applicationView.getAccountUuid(),
      applicationView.getCountry(),
      applicationView.getUniversity(),
      applicationView.getCourseName(),
      applicationView.getMinorSubject(),
      applicationView.getProgrammeLength(),
      applicationView.getApplicationStatus(),
      applicationView.getInterviewStatus(),
      applicationView.getOfferStatus(),
      applicationView.getResponseStatus(),
      applicationView.getFinalDestinationStatus(),
      Timestamp.from(applicationView.getCreatedAt()),
      Timestamp.from(applicationView.getLastUpdatedAt()),
      applicationView.getCreatedBy(),
      applicationView.getLastModifiedBy(),
      applicationView.getIsRemovable()
    );
  }
}
