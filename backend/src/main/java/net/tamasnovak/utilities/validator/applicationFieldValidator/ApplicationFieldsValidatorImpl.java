package net.tamasnovak.utilities.validator.applicationFieldValidator;

import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationType;
import net.tamasnovak.enums.status.InterviewStatusType;
import net.tamasnovak.enums.status.OfferStatusType;
import net.tamasnovak.enums.status.ResponseStatusType;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldException;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldExceptionConstants;
import net.tamasnovak.services.status.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.status.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.status.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.status.offerStatus.OfferStatusService;
import net.tamasnovak.services.status.responseStatus.ResponseStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.UUID;

@Component
public class ApplicationFieldsValidatorImpl implements ApplicationFieldsValidator {
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;

  @Autowired
  public ApplicationFieldsValidatorImpl(ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService) {
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
  }

  @Override
  public void validateStatusFields(UpdateApplicationByStudentDto newApplicationData, Application currentApplication, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(currentApplication, newApplicationData.applicationStatusUuid(), newApplicationStatus);
    validateInterviewStatus(currentApplication, newApplicationData, newInterviewStatus);
    validateOfferStatus(currentApplication, newApplicationData, newOfferStatus);
    validateResponseStatus(currentApplication, newApplicationData, newResponseStatus);
    validateFinalDestinationStatus(currentApplication, newFinalDestinationStatus);
  }

  private void validateApplicationStatus(Application currentApplication, String applicationStatusUUid, ApplicationStatus newApplicationStatus) {
    if (Objects.equals(applicationStatusUUid, "")) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.MISSING_APPLICATION_STATUS);
    }

    ApplicationStatus plannedStatus = applicationStatusService.getStatusByName(ApplicationStatusType.PLANNED.getName());

    if (areValuesEqual(newApplicationStatus.getUuid(), plannedStatus.getUuid()) && areValuesEqual(currentApplication.getApplicationStatus().getUuid(), plannedStatus.getUuid())) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.PLANNED_ERROR);
    }

    ApplicationStatus withdrawnStatus = applicationStatusService.getStatusByName(ApplicationStatusType.WITHDRAWN.getName());

    if (areValuesEqual(newApplicationStatus.getUuid(), withdrawnStatus.getUuid()) && areValuesEqual(newApplicationStatus.getUuid(), currentApplication.getUuid())) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.WITHDRAWN_ERROR);
    }
  }

  private void validateInterviewStatus(Application currentApplication, UpdateApplicationByStudentDto newApplicationData, InterviewStatus newInterviewStatus) {
    InterviewStatus notInvitedStatus = interviewStatusService.getStatusByName(InterviewStatusType.NOT_INVITED.getName());

    if (newInterviewStatus != null) {
      if (areValuesEqual(newInterviewStatus.getUuid(), notInvitedStatus.getUuid()) && (!areValuesEqual(newApplicationData.offerStatusUuid(), "") || !areValuesEqual(newApplicationData.responseStatusUuid(), "") || !areValuesEqual(newApplicationData.finalDestinationStatusUuid(), ""))) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (currentApplication.getInterviewStatus() != null) {
      if (areValuesEqual(currentApplication.getInterviewStatus().getUuid(), notInvitedStatus.getUuid()) && areValuesEqual(newApplicationData.interviewStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.NOT_INVITED_ERROR);
      }
    }
  }

  private void validateOfferStatus(Application currentApplication, UpdateApplicationByStudentDto newApplicationData, OfferStatus newOfferStatus) {
    OfferStatus rejectedStatus = offerStatusService.getStatusByName(OfferStatusType.REJECTED.getName());

    if (newOfferStatus != null) {
      if (areValuesEqual(newOfferStatus.getUuid(), rejectedStatus.getUuid()) && (!areValuesEqual(newApplicationData.responseStatusUuid(), "") || !areValuesEqual(newApplicationData.finalDestinationStatusUuid(), ""))) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (currentApplication.getOfferStatus() != null) {
      if (areValuesEqual(currentApplication.getOfferStatus().getUuid(), rejectedStatus.getUuid()) && areValuesEqual(newApplicationData.offerStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.REJECTED_ERROR);
      }
    }
  }

  private void validateResponseStatus(Application currentApplication, UpdateApplicationByStudentDto newApplicationData, ResponseStatus newResponseStatus) {
    ResponseStatus declinedStatus = responseStatusService.getStatusByName(ResponseStatusType.OFFER_DECLINED.getName());

    if (newResponseStatus != null) {
      ResponseStatus firmChoiceStatus = responseStatusService.getStatusByName(ResponseStatusType.FIRM_CHOICE.getName());
      Application firmChoiceApplication = currentApplication.getStudent().getFirmChoiceApplication();

      if (areValuesEqual(newResponseStatus.getUuid(), declinedStatus.getUuid()) && !areValuesEqual(newApplicationData.finalDestinationStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }

      if (firmChoiceApplication != null && !areValuesEqual(currentApplication.getUuid(), firmChoiceApplication.getUuid()) && areValuesEqual(newResponseStatus.getUuid(), firmChoiceStatus.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FIRM_CHOICE_ERROR);
      }
    }

    if (currentApplication.getResponseStatus() != null) {
      if (areValuesEqual(currentApplication.getResponseStatus().getUuid(), declinedStatus.getUuid()) && areValuesEqual(newApplicationData.responseStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.DECLINED_ERROR);
      }
    }
  }

  private void validateFinalDestinationStatus(Application currentApplication, FinalDestinationStatus newFinalDestinationStatus) {
    if (newFinalDestinationStatus != null) {
      Application finalDestinationApplication = currentApplication.getStudent().getFinalDestinationApplication();
      FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.getStatusByName(FinalDestinationType.NOT_FINAL_DESTINATION.getName());

      if (finalDestinationApplication != null && !areValuesEqual(currentApplication.getUuid(), finalDestinationApplication.getUuid()) && !areValuesEqual(newFinalDestinationStatus.getUuid(), notFinalDestinationStatus.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FINAL_DESTINATION_ERROR);
      }
    }
  }

  private boolean areValuesEqual(UUID uuid, UUID uuidToCheckAgainst) {
    return Objects.equals(uuid, uuidToCheckAgainst);
  }

  private boolean areValuesEqual(String uuid, String uuidToCheckAgainst) {
    return Objects.equals(uuid, uuidToCheckAgainst);
  }
}
