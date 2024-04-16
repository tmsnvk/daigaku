package net.tamasnovak.dtos.application.request;

public record NewApplicationByStudentDto(
  String countryUuid,
  String universityUuid,
  String courseName,
  String minorSubject,
  int programmeLength
) {}
