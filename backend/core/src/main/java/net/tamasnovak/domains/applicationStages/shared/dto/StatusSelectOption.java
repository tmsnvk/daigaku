package net.tamasnovak.domains.applicationStages.shared.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record StatusSelectOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
