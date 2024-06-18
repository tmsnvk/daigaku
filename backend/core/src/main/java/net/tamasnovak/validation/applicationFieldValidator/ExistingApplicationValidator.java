package net.tamasnovak.validation.applicationFieldValidator;

import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.UpdateApplicationByStudentDto;
import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.models.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.models.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;

@FunctionalInterface
public interface ExistingApplicationValidator {
  void validateStatusFields(UpdateApplicationByStudentDto newApplicationData, Application currentApplication, Student currentStudent, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
