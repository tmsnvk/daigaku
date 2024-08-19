package net.tamasnovak.artifact.support.university.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record UniversityDropdownOption(
  UUID uuid,
  String name,
  String abbreviation
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
