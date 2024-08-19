package net.tamasnovak.domain.application.studentApplication.dto;

import net.tamasnovak.domain.accountRole.student.dto.FinalDestination;
import net.tamasnovak.domain.accountRole.student.dto.FirmChoice;

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
