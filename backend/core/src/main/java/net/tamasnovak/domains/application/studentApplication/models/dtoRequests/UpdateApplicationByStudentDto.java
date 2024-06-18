package net.tamasnovak.domains.application.studentApplication.models.dtoRequests;

import jakarta.validation.constraints.NotNull;
import net.tamasnovak.validation.annotations.optionalUuidConstraint.OptionalUuidConstraint;

public record UpdateApplicationByStudentDto(
  @NotNull(message = "Select a status.")
  @OptionalUuidConstraint(message = "Select a valid status.")
  String applicationStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalUuidConstraint(message = "Select a valid status.")
  String interviewStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalUuidConstraint(message = "Select a valid status.")
  String offerStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalUuidConstraint(message = "Select a valid status.")
  String responseStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalUuidConstraint(message = "Select a valid status.")
  String finalDestinationStatusUuid
) {}
