package net.tamasnovak.dtos.responseStatus;

import java.util.UUID;

public record ResponseStatusFormDto(
  UUID uuid,
  String name
) {}
