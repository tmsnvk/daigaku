package net.tamasnovak.dtos.university;

import java.util.UUID;

public record UniversityOptionDto(
  UUID uuid,
  String name,
  String abbreviation,
  String countryCode
) {}
