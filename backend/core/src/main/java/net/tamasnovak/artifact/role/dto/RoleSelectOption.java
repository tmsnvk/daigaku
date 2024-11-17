/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.role.persistence.RoleOptionView;

/**
 * Represents a {@link Role} select option object used on the frontend in various forms.
 *
 * @param uuid The Role's uuid.
 * @param name The Role's name.
 * @since 0.0.1
 */
public record RoleSelectOption(
  UUID uuid,

  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  public RoleSelectOption(RoleOptionView roleOptionView) {
    this(
      roleOptionView.getUuid(),
      roleOptionView.getName()
    );
  }
}
