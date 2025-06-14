/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.applicationfieldvalidator;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentPayload;
import net.tamasnovak.enums.status.ApplicationStatus;
import net.tamasnovak.enums.status.FinalDestinationStatus;
import net.tamasnovak.enums.status.InterviewStatus;
import net.tamasnovak.enums.status.OfferStatus;
import net.tamasnovak.enums.status.ResponseStatus;
import net.tamasnovak.exceptions.invalidformfieldexception.FormValidationException;
import net.tamasnovak.exceptions.invalidformfieldexception.FormValidationExceptionMessages;
import org.springframework.stereotype.Component;

/**
 * TODO
 */
@Component
public class ExistingApplicationValidatorImpl implements ExistingApplicationValidator {
  @Override
  public void validateApplication(
    UpdateApplicationByStudentPayload newApplicationData, Application currentApplication, Student currentStudent,
    ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus,
    ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(currentApplication, newApplicationData.applicationStatusEnum());
    validateResponseStatus(currentApplication, currentStudent, newApplicationData, newResponseStatus);
    validateFinalDestinationStatus(currentApplication, currentStudent, newFinalDestinationStatus);
  }

  /**
   * TODO
   *
   * @param currentApplication
   * @param newApplicationStatus
   */
  private void validateApplicationStatus(Application currentApplication, ApplicationStatus newApplicationStatus) {
    if (newApplicationStatus == null && currentApplication.isApplicationStatusBlank()) {
      throw new FormValidationException(FormValidationExceptionMessages.MISSING_APPLICATION_STATUS);
    }
  }

  /**
   * TODO
   *
   * @param currentApplication
   * @param currentStudent
   * @param newApplicationData
   * @param newResponseStatus
   */
  private void validateResponseStatus(
    Application currentApplication, Student currentStudent, UpdateApplicationByStudentPayload newApplicationData,
    ResponseStatus newResponseStatus) {
    ResponseStatus declined = ResponseStatus.OFFER_DECLINED;

    if (newResponseStatus != null) {
      Optional<Application> firmChoiceApplication = currentStudent.findFirmChoiceApplication();

      if (firmChoiceApplication.isPresent() && !areValuesEqual(currentApplication.getUuid(),
        firmChoiceApplication.get().getUuid()) && newResponseStatus == ResponseStatus.FIRM_CHOICE) {
        throw new FormValidationException(FormValidationExceptionMessages.FIRM_CHOICE_ERROR);
      }
    }
  }

  /**
   * TODO
   *
   * @param currentApplication
   * @param currentStudent
   * @param newFinalDestinationStatus
   */
  private void validateFinalDestinationStatus(
    Application currentApplication, Student currentStudent, FinalDestinationStatus newFinalDestinationStatus) {
    if (newFinalDestinationStatus != null) {
      Optional<Application> finalDestinationApplication = currentStudent.findFinalDestinationApplication();

      if (finalDestinationApplication.isPresent() && !areValuesEqual(currentApplication.getUuid(),
        finalDestinationApplication.get().getUuid()) && newFinalDestinationStatus != FinalDestinationStatus.NOT_FINAL_DESTINATION) {
        throw new FormValidationException(FormValidationExceptionMessages.FINAL_DESTINATION_ERROR);
      }
    }
  }

  /**
   * TODO
   *
   * @param uuid
   * @param uuidToCheckAgainst
   * @return
   */
  private boolean areValuesEqual(UUID uuid, UUID uuidToCheckAgainst) {
    return Objects.equals(uuid, uuidToCheckAgainst);
  }
}
