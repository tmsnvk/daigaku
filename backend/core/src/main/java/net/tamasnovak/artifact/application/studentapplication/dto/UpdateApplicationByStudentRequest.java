/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.dto;

import jakarta.validation.constraints.NotNull;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.validation.annotations.optionalvaliduuid.OptionalValidUuid;

/**
 * Represents the details of an updated {@link Application} submitted by a {@link Student} authenticated user.
 *
 * @param applicationStatusUuid The ApplicationStatus uuid.
 * @param interviewStatusUuid The InterviewStatus uuid, if any, otherwise null.
 * @param offerStatusUuid The OfferStatus uuid, if any, otherwise null.
 * @param responseStatusUuid The ResponseStatus uuid, if any, otherwise null.
 * @param finalDestinationStatusUuid The FinalDestinationStatus uuid, if any, otherwise null.
 */
public record UpdateApplicationByStudentRequest(
  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String applicationStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String interviewStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String offerStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String responseStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String finalDestinationStatusUuid
) {
}
