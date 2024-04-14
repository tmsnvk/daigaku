package net.tamasnovak.dtos.application.response;

public record DashboardAggregateDataDto(
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
