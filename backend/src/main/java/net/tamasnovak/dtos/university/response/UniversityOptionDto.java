package net.tamasnovak.dtos.university.response;

import java.util.UUID;

public record UniversityOptionDto(
  UUID uuid,
  String name,
  String abbreviation
) {}
