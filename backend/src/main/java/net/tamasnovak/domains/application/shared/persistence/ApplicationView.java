package net.tamasnovak.domains.application.shared.persistence;

import java.sql.Timestamp;
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
  Timestamp getCreatedAt();
  Timestamp getLastUpdatedAt();
  String getCreatedBy();
  String getLastModifiedBy();
  Boolean getIsRemovable();
}
