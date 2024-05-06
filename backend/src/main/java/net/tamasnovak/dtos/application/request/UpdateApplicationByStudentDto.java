package net.tamasnovak.dtos.application.request;

import jakarta.validation.constraints.NotNull;

public record UpdateApplicationByStudentDto(
  @NotNull
  String applicationStatusUuid,

  @NotNull
  String interviewStatusUuid,

  @NotNull
  String offerStatusUuid,

  @NotNull
  String responseStatusUuid,

  @NotNull
  String finalDestinationStatusUuid
) {}
