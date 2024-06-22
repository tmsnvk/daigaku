package net.tamasnovak.domains.applicationStages.shared.models.dtoResponses;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record StageSelectOptionDto(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
