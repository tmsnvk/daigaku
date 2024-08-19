package net.tamasnovak.validation.applicationFieldValidator;

import net.tamasnovak.artifact.accountRole.student.entity.Student;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.applicationstages.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.responsestatus.entity.ResponseStatus;

@FunctionalInterface
public interface ExistingApplicationValidator {
  void validateStatusFields(UpdateApplicationByStudent newApplicationData, Application currentApplication, Student currentStudent, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
