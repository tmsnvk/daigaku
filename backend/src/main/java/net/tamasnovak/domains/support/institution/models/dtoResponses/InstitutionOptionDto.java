package net.tamasnovak.domains.support.institution.models.dtoResponses;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record InstitutionOptionDto(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
