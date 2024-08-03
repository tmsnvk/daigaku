package net.tamasnovak.validation.applicationFieldValidator;

import net.tamasnovak.domains.accountRole.student.entity.Student;
import net.tamasnovak.domains.application.shared.entity.Application;
import net.tamasnovak.domains.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.domains.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.entity.ResponseStatus;

@FunctionalInterface
public interface ExistingApplicationValidator {
  void validateStatusFields(UpdateApplicationByStudent newApplicationData, Application currentApplication, Student currentStudent, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
