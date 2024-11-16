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

/**
 * Represents the data displayed on a student authenticated user's dashboard page.
 *
 * @since 0.0.1
 */
public record StudentDashboardStatistics(
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
