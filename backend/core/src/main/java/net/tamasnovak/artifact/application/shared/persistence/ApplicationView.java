package net.tamasnovak.artifact.application.shared.persistence;

import java.time.Instant;
import java.util.UUID;

public interface ApplicationView {
  UUID getUuid();
  UUID getAccountUuid();
  String getCountry();
  String getUniversity();
  String getCourseName();
  String getMinorSubject();
  Integer getProgrammeLength();
  String getApplicationStatus();
  String getInterviewStatus();
  String getOfferStatus();
  String getResponseStatus();
  String getFinalDestinationStatus();
  Instant getCreatedAt();
  Instant getLastUpdatedAt();
  String getCreatedBy();
  String getLastModifiedBy();
  Boolean getIsRemovable();
}
