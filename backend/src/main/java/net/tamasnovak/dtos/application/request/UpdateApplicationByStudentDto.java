package net.tamasnovak.dtos.application.request;

public record UpdateApplicationByStudentDto(
  String applicationStatusUuid,
  String interviewStatusUuid,
  String offerStatusUuid,
  String responseStatusUuid,
  String finalDestinationStatusUuid
) {}
