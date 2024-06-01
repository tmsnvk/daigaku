package net.tamasnovak.validation.applicationFieldValidator;

import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.UpdateApplicationByStudentDto;
import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.models.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.domains.applicationStages.interviewStatus.models.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.service.OfferStatusService;
import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.service.ResponseStatusService;
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
  public void validateStatusFields(UpdateApplicationByStudentDto newApplicationData, Application currentApplication, Student currentStudent, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(currentApplication, newApplicationData.applicationStatusUuid(), newApplicationStatus);
    validateInterviewStatus(currentApplication, newApplicationData, newInterviewStatus);
    validateOfferStatus(currentApplication, newApplicationData, newOfferStatus);
    validateResponseStatus(currentApplication, currentStudent, newApplicationData, newResponseStatus);
    validateFinalDestinationStatus(currentApplication, currentStudent, newFinalDestinationStatus);
  }

  private void validateApplicationStatus(Application currentApplication, String newApplicationStatusUUid, ApplicationStatus newApplicationStatus) {
    if (Objects.equals(newApplicationStatusUUid, "")) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.MISSING_APPLICATION_STATUS);
    }

    ApplicationStatus plannedStatus = applicationStatusService.getByName(ApplicationStatusType.PLANNED.getName());

    if (areValuesEqual(newApplicationStatus.getUuid(), plannedStatus.getUuid()) && areValuesEqual(currentApplication.getApplicationStatusUuid(), plannedStatus.getUuid())) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.PLANNED_ERROR);
    }

    ApplicationStatus withdrawnStatus = applicationStatusService.getByName(ApplicationStatusType.WITHDRAWN.getName());

    if (areValuesEqual(newApplicationStatus.getUuid(), withdrawnStatus.getUuid()) && areValuesEqual(newApplicationStatus.getUuid(), currentApplication.getUuid())) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.WITHDRAWN_ERROR);
    }
  }

  private void validateInterviewStatus(Application currentApplication, UpdateApplicationByStudentDto newApplicationData, InterviewStatus newInterviewStatus) {
    InterviewStatus notInvitedStatus = interviewStatusService.getByName(InterviewStatusType.NOT_INVITED.getName());

    if (newInterviewStatus != null) {
      if (areValuesEqual(newInterviewStatus.getUuid(), notInvitedStatus.getUuid()) && (!areValuesEqual(newApplicationData.offerStatusUuid(), "") || !areValuesEqual(newApplicationData.responseStatusUuid(), "") || !areValuesEqual(newApplicationData.finalDestinationStatusUuid(), ""))) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (!currentApplication.isInterviewStatusNull()) {
      if (areValuesEqual(currentApplication.getInterviewStatusUuid(), notInvitedStatus.getUuid()) && areValuesEqual(newApplicationData.interviewStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.NOT_INVITED_ERROR);
      }
    }
  }

  private void validateOfferStatus(Application currentApplication, UpdateApplicationByStudentDto newApplicationData, OfferStatus newOfferStatus) {
    OfferStatus rejectedStatus = offerStatusService.getByName(OfferStatusType.REJECTED.getName());

    if (newOfferStatus != null) {
      if (areValuesEqual(newOfferStatus.getUuid(), rejectedStatus.getUuid()) && (!areValuesEqual(newApplicationData.responseStatusUuid(), "") || !areValuesEqual(newApplicationData.finalDestinationStatusUuid(), ""))) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (!currentApplication.isOfferStatusNull()) {
      if (areValuesEqual(currentApplication.getOfferStatusUuid(), rejectedStatus.getUuid()) && areValuesEqual(newApplicationData.offerStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.REJECTED_ERROR);
      }
    }
  }

  private void validateResponseStatus(Application currentApplication, Student currentStudent, UpdateApplicationByStudentDto newApplicationData, ResponseStatus newResponseStatus) {
    ResponseStatus declinedStatus = responseStatusService.getByName(ResponseStatusType.OFFER_DECLINED.getName());

    if (newResponseStatus != null) {
      ResponseStatus firmChoiceStatus = responseStatusService.getByName(ResponseStatusType.FIRM_CHOICE.getName());
      Application firmChoiceApplication = currentStudent.getFirmChoiceApplication(firmChoiceStatus.getName());

      if (areValuesEqual(newResponseStatus.getUuid(), declinedStatus.getUuid()) && !areValuesEqual(newApplicationData.finalDestinationStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }

      if (firmChoiceApplication != null && !areValuesEqual(currentApplication.getUuid(), firmChoiceApplication.getUuid()) && areValuesEqual(newResponseStatus.getUuid(), firmChoiceStatus.getUuid())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FIRM_CHOICE_ERROR);
      }
    }

    if (!currentApplication.isResponseStatusNull()) {
      if (areValuesEqual(currentApplication.getResponseStatusUuid(), declinedStatus.getUuid()) && areValuesEqual(newApplicationData.responseStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.DECLINED_ERROR);
      }
    }
  }

  private void validateFinalDestinationStatus(Application currentApplication, Student currentStudent, FinalDestinationStatus newFinalDestinationStatus) {
    if (newFinalDestinationStatus != null) {
      String finalDestinationStatus = finalDestinationStatusService.getByName(FinalDestinationType.FINAL_DESTINATION.getName()).getName();
      String deferredFinalDestinationStatus = finalDestinationStatusService.getByName(FinalDestinationType.DEFERRED_FINAL_DESTINATION.getName()).getName();
      FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.getByName(FinalDestinationType.NOT_FINAL_DESTINATION.getName());

      Application finalDestinationApplication = currentStudent.getFinalDestinationApplication(finalDestinationStatus, deferredFinalDestinationStatus);

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
