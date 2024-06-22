package net.tamasnovak.domains.application.studentApplication.models.dtoResponses;

import net.tamasnovak.domains.accountRole.student.models.dtoResponses.FinalDestinationDto;
import net.tamasnovak.domains.accountRole.student.models.dtoResponses.FirmChoiceDto;

public record StudentDashboardDataDto(
  FirmChoiceDto firmChoiceDto,
  FinalDestinationDto finalDestinationDto,
  int numberOfApplications,
  int numberOfPlannedStatus,
  int numberOfSubmittedStatus,
  int numberOfWithdrawnStatus,
  int numberOfDifferentCountries,
  int numberOfDifferentUniversities,
  int numberOfNotSetInterviewStatus,
  int numberOfOffers
) {}
