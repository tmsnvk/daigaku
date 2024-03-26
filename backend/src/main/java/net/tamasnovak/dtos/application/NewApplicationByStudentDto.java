package net.tamasnovak.dtos.application;

import java.util.UUID;

public record NewApplicationByStudentDto(
  UUID country,
  UUID university,
  String courseName,
  String minorSubject,
  int programmeLength
) {}
