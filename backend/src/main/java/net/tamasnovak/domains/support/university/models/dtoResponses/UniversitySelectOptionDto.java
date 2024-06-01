package net.tamasnovak.domains.support.university.models.dtoResponses;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record UniversitySelectOptionDto(
  UUID uuid,
  String name,
  String abbreviation
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
