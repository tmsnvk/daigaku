package net.tamasnovak.utilities.validator.applicationFieldValidator;

import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.services.status.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.status.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.status.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.status.offerStatus.OfferStatusService;
import net.tamasnovak.services.status.responseStatus.ResponseStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
  public void validateStatusFields(UpdateApplicationByStudentDto applicationDto, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {

  }

  public void validateApplicationStatus(String applicationStatusUUid, ApplicationStatus newApplicationStatus) {

  }

  public void validateInterviewStatus(InterviewStatus newInterviewStatus, UpdateApplicationByStudentDto applicationDto) {

  }

  public void validateOfferStatus(OfferStatus newOfferStatus, UpdateApplicationByStudentDto applicationDto) {

  }

  public void validateResponseStatus(ResponseStatus newResponseStatus, UpdateApplicationByStudentDto applicationDto) {

  }

  public void validateFinalDestinationStatus(FinalDestinationStatus newFinalDestinationStatus) {

  }
}
