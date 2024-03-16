package net.tamasnovak.dtos.application;

public record DashboardDataDto(
  String finalDestinationCountry,
  String finalDestinationUniversity,
  String finalDestinationCourseName,
  long numberOfApplications,
  long numberOfPlannedStatus,
  long numberOfSubmittedStatus,
  long numberOfWithdrawnStatus,
  long numberOfDifferentCountries,
  long numberOfDifferentUniversities,
  long numberOfOffers
) {}
