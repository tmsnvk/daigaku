package net.tamasnovak.domain.support.university.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record UniversitySelectOption(
  UUID uuid,
  String name,
  String abbreviation
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
