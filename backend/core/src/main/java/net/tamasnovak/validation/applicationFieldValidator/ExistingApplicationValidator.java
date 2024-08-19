package net.tamasnovak.validation.applicationFieldValidator;

import net.tamasnovak.domain.accountRole.student.entity.Student;
import net.tamasnovak.domain.application.shared.entity.Application;
import net.tamasnovak.domain.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.domain.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domain.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domain.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domain.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domain.applicationStages.responseStatus.entity.ResponseStatus;

@FunctionalInterface
public interface ExistingApplicationValidator {
  void validateStatusFields(UpdateApplicationByStudent newApplicationData, Application currentApplication, Student currentStudent, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
