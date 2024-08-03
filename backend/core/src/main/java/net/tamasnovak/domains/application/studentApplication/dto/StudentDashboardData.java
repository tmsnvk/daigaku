package net.tamasnovak.domains.application.studentApplication.dto;

import net.tamasnovak.domains.accountRole.student.dto.FinalDestination;
import net.tamasnovak.domains.accountRole.student.dto.FirmChoice;

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
