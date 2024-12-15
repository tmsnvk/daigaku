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
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentRequest;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.service.ResponseStatusService;
import net.tamasnovak.enums.status.FinalDestinationStatusE;
import net.tamasnovak.enums.status.ResponseStatusE;
import net.tamasnovak.exceptions.invalidformfieldexception.InvalidFormFieldException;
import net.tamasnovak.exceptions.invalidformfieldexception.InvalidFormFieldExceptionMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * TODO
 *
 * @since 0.0.1
 */
@Component
public class ExistingApplicationValidatorImpl implements ExistingApplicationValidator {
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;

  @Autowired
  public ExistingApplicationValidatorImpl(
    ResponseStatusService responseStatusService,
    FinalDestinationStatusService finalDestinationStatusService) {
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
  }

  @Override
  public void validateApplication(
    UpdateApplicationByStudentRequest newApplicationData, Application currentApplication, Student currentStudent,
    ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus,
    ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(currentApplication, newApplicationData.applicationStatusUuid(), newApplicationStatus);
    validateResponseStatus(currentApplication, currentStudent, newApplicationData, newResponseStatus);
    validateFinalDestinationStatus(currentApplication, currentStudent, newFinalDestinationStatus);
  }

  /**
   * TODO
   *
   * @param currentApplication
   * @param newApplicationStatusUuid
   * @param newApplicationStatus
   */
  private void validateApplicationStatus(
    Application currentApplication, String newApplicationStatusUuid,
    ApplicationStatus newApplicationStatus) {
    if (newApplicationStatusUuid.isEmpty() && currentApplication.isApplicationStatusNull()) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.MISSING_APPLICATION_STATUS);
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
    Application currentApplication, Student currentStudent, UpdateApplicationByStudentRequest newApplicationData,
    ResponseStatus newResponseStatus) {
    ResponseStatus declined = responseStatusService.findStatusByName(ResponseStatusE.OFFER_DECLINED.getValue());
    final String firmChoiceStatusName = responseStatusService.findStatusByName(ResponseStatusE.FIRM_CHOICE.getValue()).getName();

    if (newResponseStatus != null) {
      ResponseStatus firmChoice = responseStatusService.findStatusByName(ResponseStatusE.FIRM_CHOICE.getValue());
      Optional<Application> firmChoiceApplication = currentStudent.findFirmChoiceApplication(firmChoiceStatusName);

      if (firmChoiceApplication.isPresent()
        && !areValuesEqual(currentApplication.getUuid(), firmChoiceApplication.get().getUuid())
        && areValuesEqual(newResponseStatus.getUuid(), firmChoice.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.FIRM_CHOICE_ERROR);
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
      String finalDestination = finalDestinationStatusService.findStatusByName(FinalDestinationStatusE.FINAL_DESTINATION.getValue())
                                                             .getName();
      String deferredFinalDestination = finalDestinationStatusService.findStatusByName(
        FinalDestinationStatusE.DEFERRED_FINAL_DESTINATION.getValue()).getName();
      FinalDestinationStatus notFinalDestination = finalDestinationStatusService.findStatusByName(
        FinalDestinationStatusE.NOT_FINAL_DESTINATION.getValue());
      final String finalDestinationStatusName =
        finalDestinationStatusService.findStatusByName(FinalDestinationStatusE.FINAL_DESTINATION.getValue()).getName();
      final String deferredFinalDestinationStatusName =
        finalDestinationStatusService.findStatusByName(FinalDestinationStatusE.DEFERRED_FINAL_DESTINATION.getValue()).getName();

      Optional<Application> finalDestinationApplication = currentStudent.findFinalDestinationApplication(finalDestinationStatusName,
        deferredFinalDestinationStatusName);

      if (finalDestinationApplication.isPresent()
        && !areValuesEqual(currentApplication.getUuid(), finalDestinationApplication.get().getUuid())
        && !areValuesEqual(newFinalDestinationStatus.getUuid(), notFinalDestination.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.FINAL_DESTINATION_ERROR);
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
