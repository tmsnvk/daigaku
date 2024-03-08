package net.tamasnovak.dtos.application;

import java.util.UUID;

public record NewApplicationDto(
  UUID country,
  UUID university,
  String majorSubject,
  String minorSubject,
  int programmeLength
) {}
