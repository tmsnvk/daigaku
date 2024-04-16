package net.tamasnovak.dtos.institution.response;

import java.util.UUID;

public record InstitutionOptionDto(
  UUID uuid,
  String city,
  String name
) {}
