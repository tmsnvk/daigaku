package net.tamasnovak.dtos.status;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record StatusSelectOptionView(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
