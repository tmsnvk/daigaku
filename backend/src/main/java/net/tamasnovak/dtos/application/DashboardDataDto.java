package net.tamasnovak.dtos.application;

public record DashboardDataDto(
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
