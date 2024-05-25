package net.tamasnovak.utilities.validator.applicationFieldValidator;

import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;

@FunctionalInterface
public interface ApplicationFieldsValidator {
  void validateStatusFields(UpdateApplicationByStudentDto newApplicationData, Application currentApplication, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
