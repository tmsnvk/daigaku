package net.tamasnovak.domains.role.models.dtoResponses;

import net.tamasnovak.domains.role.persistence.RoleOptionView;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record RoleOptionsDto(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  public RoleOptionsDto(RoleOptionView roleOptionView) {
    this(
      roleOptionView.getUuid(),
      roleOptionView.getName()
    );
  }
}
