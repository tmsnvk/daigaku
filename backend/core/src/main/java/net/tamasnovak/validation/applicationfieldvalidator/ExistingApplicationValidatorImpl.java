/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.applicationfieldvalidator;

import java.util.Objects;
import java.util.UUID;

import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.service.InterviewStatusService;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.offerstatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.service.ResponseStatusService;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationStatusType;
import net.tamasnovak.enums.status.InterviewStatusType;
import net.tamasnovak.enums.status.OfferStatusType;
import net.tamasnovak.enums.status.ResponseStatusType;
import net.tamasnovak.exceptions.invalidformfieldexception.InvalidFormFieldException;
import net.tamasnovak.exceptions.invalidformfieldexception.InvalidFormFieldExceptionMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExistingApplicationValidatorImpl implements ExistingApplicationValidator {
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;

  @Autowired
  public ExistingApplicationValidatorImpl(
    ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService,
    OfferStatusService offerStatusService, ResponseStatusService responseStatusService,
    FinalDestinationStatusService finalDestinationStatusService) {
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
  }

  @Override
  public void validateStatusFields(
    UpdateApplicationByStudent newApplicationData, Application currentApplication, Student currentStudent,
    ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus,
    ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(currentApplication, newApplicationData.applicationStatusUuid(), newApplicationStatus);
    validateInterviewStatus(currentApplication, newApplicationData, newInterviewStatus);
    validateOfferStatus(currentApplication, newApplicationData, newOfferStatus);
    validateResponseStatus(currentApplication, currentStudent, newApplicationData, newResponseStatus);
    validateFinalDestinationStatus(currentApplication, currentStudent, newFinalDestinationStatus);
  }

  private void validateApplicationStatus(
    Application currentApplication, String newApplicationStatusUUid, ApplicationStatus newApplicationStatus) {
    if (newApplicationStatusUUid.isEmpty() && currentApplication.isApplicationStatusNull()) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.MISSING_APPLICATION_STATUS);
    }

    ApplicationStatus planned = applicationStatusService.findApplicationStatusByName(ApplicationStatusType.PLANNED.getName());

    if (newApplicationStatus != null) {
      if (areValuesEqual(newApplicationStatus.getUuid(), planned.getUuid()) && areValuesEqual(currentApplication.getApplicationStatusUuid(),
        planned.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.PLANNED_ERROR);
      }

      ApplicationStatus withdrawn = applicationStatusService.findApplicationStatusByName(ApplicationStatusType.WITHDRAWN.getName());

      if (areValuesEqual(newApplicationStatus.getUuid(), withdrawn.getUuid()) && areValuesEqual(newApplicationStatus.getUuid(),
        currentApplication.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.WITHDRAWN_ERROR);
      }
    }
  }

  private void validateInterviewStatus(
    Application currentApplication, UpdateApplicationByStudent newApplicationData, InterviewStatus newInterviewStatus) {
    InterviewStatus notInvited = interviewStatusService.findByName(InterviewStatusType.NOT_INVITED.getName());

    if (newInterviewStatus != null) {
      if (areValuesEqual(newInterviewStatus.getUuid(), notInvited.getUuid())
        && (!newApplicationData.offerStatusUuid().isEmpty() || !newApplicationData.responseStatusUuid().isEmpty()
        || !newApplicationData.finalDestinationStatusUuid().isEmpty())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.GENERIC_ERROR);
      }
    }

    if (!currentApplication.isInterviewStatusNull()) {
      if (areValuesEqual(currentApplication.getInterviewStatusUuid(), notInvited.getUuid())
        && newApplicationData.interviewStatusUuid().isEmpty()) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.NOT_INVITED_ERROR);
      }
    }
  }

  private void validateOfferStatus(
    Application currentApplication, UpdateApplicationByStudent newApplicationData, OfferStatus newOfferStatus) {
    OfferStatus rejected = offerStatusService.findByName(OfferStatusType.REJECTED.getName());

    if (newOfferStatus != null) {
      if (areValuesEqual(newOfferStatus.getUuid(), rejected.getUuid())
        && (!newApplicationData.responseStatusUuid().isEmpty() || !newApplicationData.finalDestinationStatusUuid().isEmpty())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.GENERIC_ERROR);
      }
    }

    if (!currentApplication.isOfferStatusNull()) {
      if (areValuesEqual(currentApplication.getOfferStatusUuid(), rejected.getUuid()) && newApplicationData.offerStatusUuid().isEmpty()) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.REJECTED_ERROR);
      }
    }
  }

  private void validateResponseStatus(
    Application currentApplication, Student currentStudent, UpdateApplicationByStudent newApplicationData,
    ResponseStatus newResponseStatus) {
    ResponseStatus declined = responseStatusService.findByName(ResponseStatusType.OFFER_DECLINED.getValue());

    if (newResponseStatus != null) {
      ResponseStatus firmChoice = responseStatusService.findByName(ResponseStatusType.FIRM_CHOICE.getValue());
      Application firmChoiceApplication = currentStudent.findFirmChoiceApplication();

      if (firmChoiceApplication != null && !areValuesEqual(currentApplication.getUuid(), firmChoiceApplication.getUuid()) && areValuesEqual(
        newResponseStatus.getUuid(), firmChoice.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.FIRM_CHOICE_ERROR);
      }
    }

    if (!currentApplication.isResponseStatusNull()) {
      if (areValuesEqual(currentApplication.getResponseStatusUuid(), declined.getUuid())
        && newApplicationData.responseStatusUuid().isEmpty()) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.DECLINED_ERROR);
      }
    }
  }

  private void validateFinalDestinationStatus(
    Application currentApplication, Student currentStudent, FinalDestinationStatus newFinalDestinationStatus) {
    if (newFinalDestinationStatus != null) {
      String finalDestination = finalDestinationStatusService.findByName(FinalDestinationStatusType.FINAL_DESTINATION.getValue()).getName();
      String deferredFinalDestination = finalDestinationStatusService.findByName(
        FinalDestinationStatusType.DEFERRED_FINAL_DESTINATION.getValue()).getName();
      FinalDestinationStatus notFinalDestination = finalDestinationStatusService.findByName(
        FinalDestinationStatusType.NOT_FINAL_DESTINATION.getValue());

      Application finalDestinationApplication = currentStudent.findFinalDestinationApplication();

      if (finalDestinationApplication != null && !areValuesEqual(currentApplication.getUuid(),
        finalDestinationApplication.getUuid()) && !areValuesEqual(newFinalDestinationStatus.getUuid(), notFinalDestination.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionMessages.FINAL_DESTINATION_ERROR);
      }
    }
  }

  private boolean areValuesEqual(UUID uuid, UUID uuidToCheckAgainst) {
    return Objects.equals(uuid, uuidToCheckAgainst);
  }
}
