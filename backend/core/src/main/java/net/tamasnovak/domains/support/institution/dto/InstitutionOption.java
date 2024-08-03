package net.tamasnovak.domains.support.institution.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record InstitutionOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
