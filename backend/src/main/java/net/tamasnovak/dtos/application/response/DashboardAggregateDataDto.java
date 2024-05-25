package net.tamasnovak.dtos.application.response;

import java.io.Serial;
import java.io.Serializable;

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
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
