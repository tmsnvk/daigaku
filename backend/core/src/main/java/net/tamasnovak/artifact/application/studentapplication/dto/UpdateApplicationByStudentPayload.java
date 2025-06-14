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
import net.tamasnovak.exceptions.invalidformfieldexception.FormValidationExceptionMessages;
import net.tamasnovak.validation.annotations.validenum.ValidEnum;

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
  @ValidEnum(enumClass = ApplicationStatus.class, message = FormValidationExceptionMessages.INVALID_APPLICATION_STATUS)
  String applicationStatus,

  @ValidEnum(enumClass = InterviewStatus.class, message = FormValidationExceptionMessages.INVALID_INTERVIEW_STATUS)
  String interviewStatus,

  @ValidEnum(enumClass = OfferStatus.class, message = FormValidationExceptionMessages.INVALID_OFFER_STATUS)
  String offerStatus,

  @ValidEnum(enumClass = ResponseStatus.class, message = FormValidationExceptionMessages.INVALID_RESPONSE_STATUS)
  String responseStatus,

  @ValidEnum(enumClass = FinalDestinationStatus.class, message = FormValidationExceptionMessages.INVALID_FINAL_DESTINATION_STATUS)
  String finalDestinationStatus
) {
  public ApplicationStatus applicationStatusEnum() {
    return ApplicationStatus.valueOf(applicationStatus);
  }

  public InterviewStatus interviewStatusEnum() {
    return interviewStatus != null ? InterviewStatus.valueOf(interviewStatus) : null;
  }

  public OfferStatus offerStatusEnum() {
    return offerStatus != null ? OfferStatus.valueOf(offerStatus) : null;
  }

  public ResponseStatus responseStatusEnum() {
    return responseStatus != null ? ResponseStatus.valueOf(responseStatus) : null;
  }

  public FinalDestinationStatus finalDestinationStatusEnum() {
    return finalDestinationStatus != null ? FinalDestinationStatus.valueOf(finalDestinationStatus) : null;
  }
}
