/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.shared.dto;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;

/**
 * Represents an {@link Application} object. This is the central object that the frontend uses on application-related display and edit
 * pages.
 *
 * @since 0.0.1
 */
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
