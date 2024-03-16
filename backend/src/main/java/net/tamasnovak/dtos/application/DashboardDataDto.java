package net.tamasnovak.dtos.application;

public record DashboardDataDto(
  String firmChoiceCountry,
  String firmChoiceUniversity,
  String firmChoiceCourseName,
  String finalDestinationCountry,
  String finalDestinationUniversity,
  String finalDestinationCourseName,
  long numberOfApplications,
  long numberOfPlannedStatus,
  long numberOfSubmittedStatus,
  long numberOfWithdrawnStatus,
  long numberOfDifferentCountries,
  long numberOfDifferentUniversities,
  long numberOfNotSetInterviewStatus,
  long numberOfOffers
) {}
