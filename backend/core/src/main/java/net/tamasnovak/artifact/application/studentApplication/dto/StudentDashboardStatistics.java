package net.tamasnovak.artifact.application.studentApplication.dto;

import net.tamasnovak.artifact.accounttype.student.dto.FinalDestinationTileDto;
import net.tamasnovak.artifact.accounttype.student.dto.FirmChoiceTileDto;

public record StudentDashboardStatistics(
  FirmChoiceTileDto firmChoiceTileDto,
  FinalDestinationTileDto finalDestinationTileDto,
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
