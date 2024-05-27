package net.tamasnovak.utilities.validator.applicationFieldValidator;

import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.status.ApplicationStatus;
import net.tamasnovak.entities.status.FinalDestinationStatus;
import net.tamasnovak.entities.status.InterviewStatus;
import net.tamasnovak.entities.status.OfferStatus;
import net.tamasnovak.entities.status.ResponseStatus;

@FunctionalInterface
public interface ApplicationFieldsValidator {
  void validateStatusFields(UpdateApplicationByStudentDto newApplicationData, Application currentApplication, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
