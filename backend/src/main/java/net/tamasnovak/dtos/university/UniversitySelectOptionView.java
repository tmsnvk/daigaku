package net.tamasnovak.dtos.university;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record UniversitySelectOptionView(
  UUID uuid,
  String name,
  String abbreviation
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
