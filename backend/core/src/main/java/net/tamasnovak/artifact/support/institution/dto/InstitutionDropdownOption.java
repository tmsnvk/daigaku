package net.tamasnovak.artifact.support.institution.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record InstitutionDropdownOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
