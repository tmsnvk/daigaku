package net.tamasnovak.artifact.role.dto;

import net.tamasnovak.artifact.role.persistence.RoleOptionView;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record RoleDropdownOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  public RoleDropdownOption(RoleOptionView roleOptionView) {
    this(
      roleOptionView.getUuid(),
      roleOptionView.getName()
    );
  }
}
