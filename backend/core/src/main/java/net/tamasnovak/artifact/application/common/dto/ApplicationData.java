/**
 * Copyright © [Daigaku].
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
 * Represents an {@link Application} object. This is the one of the central objects that the frontend application uses on
 * application-related display and edit pages.
 *
 * @param uuid The application's uuid.
 * @param accountUuid The application's account uuid.
 * @param country The application's country name.
 * @param university The application's university name.
 * @param courseName The application's course name.
 * @param minorSubject The application's minor subject.
 * @param programmeLength The application's programme length.
 * @param applicationStatus The application's ApplicationStatus object containing the status's name and uuid.
 * @param interviewStatus The application's InterviewStatus object containing the status's name and uuid.
 * @param offerStatus The application's OfferStatus object containing the status's name and uuid.
 * @param responseStatus The application's ResponseStatus object containing the status's name and uuid.
 * @param finalDestinationStatus The application's FinalDestinationStatus object containing the status's name and uuid.
 * @param createdAt The application's creation timestamp.
 * @param lastUpdatedAt The application's last update timestamp.
 * @param createdBy The account's name that created the application.
 * @param lastModifiedBy The account's name that last updated the application.
 * @param isRemovable A boolean value marking whether the application is marked for removal.
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
