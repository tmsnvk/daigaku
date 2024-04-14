package net.tamasnovak.dtos.application.request;

import java.util.UUID;

public record NewApplicationByStudentDto(
  UUID countryUuid,
  UUID universityUuid,
  String courseName,
  String minorSubject,
  int programmeLength
) {}
