package net.tamasnovak.artifact.role.dto;

import net.tamasnovak.artifact.role.persistence.RoleOptionView;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record RoleOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  public RoleOption(RoleOptionView roleOptionView) {
    this(
      roleOptionView.getUuid(),
      roleOptionView.getName()
    );
  }
}
