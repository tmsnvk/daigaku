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
 * Represents an {@link Application} object. This is one of the central objects that the frontend application uses on
 * application-related display and edit pages.
 *
 * @param uuid The application's uuid.
 * @param accountUuid The application's account uuid.
 * @param country The application's country name.
 * @param university The application's university name.
 * @param courseName The application's course name.
 * @param minorSubject The application's minor subject.
 * @param programmeLength The application's programme length.
 * @param applicationStatus The application's ApplicationStatus name (as a String).
 * @param interviewStatus The application's InterviewStatus name (as a String).
 * @param offerStatus The application's OfferStatus name (as a String).
 * @param responseStatus The application's ResponseStatus name (as a String).
 * @param finalDestinationStatus The application's FinalDestinationStatus name (as a String).
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
