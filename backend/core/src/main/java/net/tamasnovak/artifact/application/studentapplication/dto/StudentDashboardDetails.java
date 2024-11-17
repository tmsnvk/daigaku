/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.dto;

import net.tamasnovak.artifact.accounttype.student.dto.FinalDestinationTileDetails;
import net.tamasnovak.artifact.accounttype.student.dto.FirmChoiceTileDetails;
import net.tamasnovak.artifact.accounttype.student.entity.Student;

/**
 * Represents the data displayed on a {@link Student} authenticated user's dashboard page.
 *
 * @param firmChoiceTileDetails The details of the student's 'Firm Choice' application, otherwise null.
 * @param finalDestinationTileDetails The details of the student's 'Final Destination' application, otherwise null.
 * @param applicationsCount The number of applications the student has.
 * @param plannedApplicationsCount The number of 'Planned' applications the student has.
 * @param submittedApplicationsCount The number of 'Submitted' applications the student has.
 * @param withdrawnStatusCount The number of 'Withdrawn' applications the student has.
 * @param distinctCountriesCount The number of distinct countries the student has applied to.
 * @param distinctUniversitiesCount The number of distinct universities the student has applied to.
 * @param notSetInterviewStatusCount The number of applications where the InterviewStatus is not yet set.
 * @param offersCount The number of applications where the OfferStatus is set with a positive outcome.
 * @since 0.0.1
 */
public record StudentDashboardDetails(
  FirmChoiceTileDetails firmChoiceTileDetails,

  FinalDestinationTileDetails finalDestinationTileDetails,

  int applicationsCount,

  int plannedApplicationsCount,

  int submittedApplicationsCount,

  int withdrawnStatusCount,

  int distinctCountriesCount,

  int distinctUniversitiesCount,

  int notSetInterviewStatusCount,

  int offersCount
) {
}
