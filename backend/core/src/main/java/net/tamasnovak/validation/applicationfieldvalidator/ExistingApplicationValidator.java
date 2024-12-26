/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.applicationfieldvalidator;

import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentRequest;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;

/**
 * TODO
 */
@FunctionalInterface
public interface ExistingApplicationValidator {
  void validateApplication(
    UpdateApplicationByStudentRequest newApplicationData, Application currentApplication, Student currentStudent,
    ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus,
    ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus);
}
