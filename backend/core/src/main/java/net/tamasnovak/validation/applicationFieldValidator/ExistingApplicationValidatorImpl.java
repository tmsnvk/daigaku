package net.tamasnovak.validation.applicationFieldValidator;

import net.tamasnovak.artifact.accountRole.student.entity.Student;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.applicationstages.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.applicationstatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationstages.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.interviewstatus.service.InterviewStatusService;
import net.tamasnovak.artifact.applicationstages.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.offerstatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationstages.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.responsestatus.service.ResponseStatusService;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationType;
import net.tamasnovak.enums.status.InterviewStatusType;
import net.tamasnovak.enums.status.OfferStatusType;
import net.tamasnovak.enums.status.ResponseStatusType;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldException;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldExceptionConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.UUID;

@Component
public class ExistingApplicationValidatorImpl implements ExistingApplicationValidator {
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;

  @Autowired
  public ExistingApplicationValidatorImpl(ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService) {
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
  }

  @Override
  public void validateStatusFields(UpdateApplicationByStudent newApplicationData,
                                   Application currentApplication,
                                   Student currentStudent,
                                   ApplicationStatus newApplicationStatus,
                                   InterviewStatus newInterviewStatus,
                                   OfferStatus newOfferStatus,
                                   ResponseStatus newResponseStatus,
                                   FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(currentApplication, newApplicationData.applicationStatusUuid(), newApplicationStatus);
    validateInterviewStatus(currentApplication, newApplicationData, newInterviewStatus);
    validateOfferStatus(currentApplication, newApplicationData, newOfferStatus);
    validateResponseStatus(currentApplication, currentStudent, newApplicationData, newResponseStatus);
    validateFinalDestinationStatus(currentApplication, currentStudent, newFinalDestinationStatus);
  }

  private void validateApplicationStatus(Application currentApplication,
                                         UUID newApplicationStatusUUid,
                                         ApplicationStatus newApplicationStatus) {
    if (newApplicationStatusUUid.toString().isEmpty() && currentApplication.isApplicationStatusNull()) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.MISSING_APPLICATION_STATUS);
    }

    ApplicationStatus planned = applicationStatusService.getByName(ApplicationStatusType.PLANNED.getName());

    if (newApplicationStatus != null) {
      if (areValuesEqual(newApplicationStatus.getUuid(), planned.getUuid()) && areValuesEqual(currentApplication.getApplicationStatusUuid(), planned.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.PLANNED_ERROR);
      }

      ApplicationStatus withdrawn = applicationStatusService.getByName(ApplicationStatusType.WITHDRAWN.getName());

      if (areValuesEqual(newApplicationStatus.getUuid(), withdrawn.getUuid()) && areValuesEqual(newApplicationStatus.getUuid(), currentApplication.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.WITHDRAWN_ERROR);
      }
    }
  }

  private void validateInterviewStatus(Application currentApplication,
                                       UpdateApplicationByStudent newApplicationData,
                                       InterviewStatus newInterviewStatus) {
    InterviewStatus notInvited = interviewStatusService.getByName(InterviewStatusType.NOT_INVITED.getName());

    if (newInterviewStatus != null) {
      if (areValuesEqual(newInterviewStatus.getUuid(), notInvited.getUuid()) && (!newApplicationData.offerStatusUuid().toString().isEmpty() || !newApplicationData.responseStatusUuid().toString().isEmpty() || !newApplicationData.finalDestinationStatusUuid().toString().isEmpty())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (!currentApplication.isInterviewStatusNull()) {
      if (areValuesEqual(currentApplication.getInterviewStatusUuid(), notInvited.getUuid()) && newApplicationData.interviewStatusUuid().toString().isEmpty()) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.NOT_INVITED_ERROR);
      }
    }
  }

  private void validateOfferStatus(Application currentApplication,
                                   UpdateApplicationByStudent newApplicationData,
                                   OfferStatus newOfferStatus) {
    OfferStatus rejected = offerStatusService.getByName(OfferStatusType.REJECTED.getName());

    if (newOfferStatus != null) {
      if (areValuesEqual(newOfferStatus.getUuid(), rejected.getUuid()) && (!newApplicationData.responseStatusUuid().toString().isEmpty() || !newApplicationData.finalDestinationStatusUuid().toString().isEmpty())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (!currentApplication.isOfferStatusNull()) {
      if (areValuesEqual(currentApplication.getOfferStatusUuid(), rejected.getUuid()) && newApplicationData.offerStatusUuid().toString().isEmpty()) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.REJECTED_ERROR);
      }
    }
  }

  private void validateResponseStatus(Application currentApplication,
                                      Student currentStudent,
                                      UpdateApplicationByStudent newApplicationData,
                                      ResponseStatus newResponseStatus) {
    ResponseStatus declined = responseStatusService.getByName(ResponseStatusType.OFFER_DECLINED.getName());

    if (newResponseStatus != null) {
      ResponseStatus firmChoice = responseStatusService.getByName(ResponseStatusType.FIRM_CHOICE.getName());
      Application firmChoiceApplication = currentStudent.getFirmChoiceApplication(firmChoice.getName());

      if (firmChoiceApplication != null && !areValuesEqual(currentApplication.getUuid(), firmChoiceApplication.getUuid()) && areValuesEqual(newResponseStatus.getUuid(), firmChoice.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FIRM_CHOICE_ERROR);
      }
    }

    if (!currentApplication.isResponseStatusNull()) {
      if (areValuesEqual(currentApplication.getResponseStatusUuid(), declined.getUuid()) && newApplicationData.responseStatusUuid().toString().isEmpty()) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.DECLINED_ERROR);
      }
    }
  }

  private void validateFinalDestinationStatus(Application currentApplication,
                                              Student currentStudent,
                                              FinalDestinationStatus newFinalDestinationStatus) {
    if (newFinalDestinationStatus != null) {
      String finalDestination = finalDestinationStatusService.getByName(FinalDestinationType.FINAL_DESTINATION.getName()).getName();
      String deferredFinalDestination = finalDestinationStatusService.getByName(FinalDestinationType.DEFERRED_FINAL_DESTINATION.getName()).getName();
      FinalDestinationStatus notFinalDestination = finalDestinationStatusService.getByName(FinalDestinationType.NOT_FINAL_DESTINATION.getName());

      Application finalDestinationApplication = currentStudent.getFinalDestinationApplication(finalDestination, deferredFinalDestination);

      if (finalDestinationApplication != null && !areValuesEqual(currentApplication.getUuid(), finalDestinationApplication.getUuid()) && !areValuesEqual(newFinalDestinationStatus.getUuid(), notFinalDestination.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FINAL_DESTINATION_ERROR);
      }
    }
  }

  private boolean areValuesEqual(UUID uuid, UUID uuidToCheckAgainst) {
    return Objects.equals(uuid, uuidToCheckAgainst);
  }
}
