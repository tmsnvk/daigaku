package net.tamasnovak.artifact.application.studentApplication.dto;

import net.tamasnovak.artifact.accountRole.student.dto.FinalDestination;
import net.tamasnovak.artifact.accountRole.student.dto.FirmChoice;

public record StudentDashboardStatistics(
  FirmChoice firmChoice,
  FinalDestination finalDestination,
  int applicationsCount,
  int plannedApplicationsCount,
  int submittedApplicationsCount,
  int withdrawnStatusCount,
  int distinctCountriesCount,
  int distinctUniversitiesCount,
  int notSetInterviewStatusCount,
  int offersCount
) {}
