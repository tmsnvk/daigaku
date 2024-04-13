package net.tamasnovak.dtos.responseStatus.response;

import java.util.UUID;

public record ResponseStatusOptionDto(
  UUID uuid,
  String name
) {}
