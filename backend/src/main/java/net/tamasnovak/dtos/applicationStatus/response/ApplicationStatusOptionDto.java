package net.tamasnovak.dtos.applicationStatus.response;

import java.util.UUID;

public record ApplicationStatusOptionDto(
  UUID uuid,
  String name
) {}
