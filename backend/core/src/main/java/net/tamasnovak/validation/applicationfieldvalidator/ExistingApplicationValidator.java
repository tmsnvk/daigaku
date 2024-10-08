package net.tamasnovak.validation.applicationfieldvalidator;

import net.tamasnovak.artifact.accountRole.student.entity.Student;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.applicationstages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.offerStatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.responseStatus.entity.ResponseStatus;

@FunctionalInterface
public interface ExistingApplicationValidator {
  void validateStatusFields(UpdateApplicationByStudent newApplicationData, Application currentApplication, Student currentStudent, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
