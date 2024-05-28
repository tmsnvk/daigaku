package net.tamasnovak.dtos.role.response;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record MappedRoleOptionView(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
