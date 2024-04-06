package net.tamasnovak.dtos.applicationStatus;

import java.util.UUID;

public record ApplicationStatusFormDto(
  UUID uuid,
  String name
) {}
