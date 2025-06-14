/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.dto;

import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.enums.status.ApplicationStatus;
import net.tamasnovak.enums.status.FinalDestinationStatus;
import net.tamasnovak.enums.status.InterviewStatus;
import net.tamasnovak.enums.status.OfferStatus;
import net.tamasnovak.enums.status.ResponseStatus;

/**
 * Represents the details of an updated {@link Application} submitted by a {@link Student} authenticated user.
 *
 * @param applicationStatus
 * @param interviewStatus
 * @param offerStatus
 * @param responseStatus
 * @param finalDestinationStatus
 */
public record UpdateApplicationByStudentPayload(
  ApplicationStatus applicationStatus,

  InterviewStatus interviewStatus,

  OfferStatus offerStatus,

  ResponseStatus responseStatus,

  FinalDestinationStatus finalDestinationStatus
) {
}
