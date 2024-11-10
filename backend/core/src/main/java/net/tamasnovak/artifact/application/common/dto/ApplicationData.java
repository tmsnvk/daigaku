/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.dto;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.common.persistence.ApplicationView;

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

  ApplicationStatusView applicationStatus,

  ApplicationStatusView interviewStatus,

  ApplicationStatusView offerStatus,

  ApplicationStatusView responseStatus,

  ApplicationStatusView finalDestinationStatus,

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
      toStatusView(applicationView.getApplicationStatusUuid(), applicationView.getApplicationStatusName()),
      toStatusView(applicationView.getInterviewStatusUuid(), applicationView.getInterviewStatusName()),
      toStatusView(applicationView.getOfferStatusUuid(), applicationView.getOfferStatusName()),
      toStatusView(applicationView.getResponseStatusUuid(), applicationView.getResponseStatusName()),
      toStatusView(applicationView.getFinalDestinationStatusUuid(), applicationView.getFinalDestinationStatusName()),
      Timestamp.from(applicationView.getCreatedAt()),
      Timestamp.from(applicationView.getLastUpdatedAt()),
      applicationView.getCreatedBy(),
      applicationView.getLastModifiedBy(),
      applicationView.getIsRemovable()
    );
  }

  /**
   * Creates {@link ApplicationStatusView} instances.
   *
   * @param uuid The instance's uuid.
   * @param name The instance's name.
   * @return {@link ApplicationStatusView}.
   */
  private static ApplicationStatusView toStatusView(UUID uuid, String name) {
    return new ApplicationStatusView(uuid, name);
  }
}
