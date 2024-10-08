package net.tamasnovak.artifact.applicationstages.shared.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record StatusDropdownOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
