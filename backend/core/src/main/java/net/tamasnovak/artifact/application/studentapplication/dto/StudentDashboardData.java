package net.tamasnovak.artifact.application.studentapplication.dto;

import net.tamasnovak.artifact.accountRole.student.dto.FinalDestination;
import net.tamasnovak.artifact.accountRole.student.dto.FirmChoice;

public record StudentDashboardData(
  FirmChoice firmChoice,
  FinalDestination finalDestination,
  int numberOfApplications,
  int numberOfPlannedStatus,
  int numberOfSubmittedStatus,
  int numberOfWithdrawnStatus,
  int numberOfDifferentCountries,
  int numberOfDifferentUniversities,
  int numberOfNotSetInterviewStatus,
  int numberOfOffers
) {}
