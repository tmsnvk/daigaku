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

import net.tamasnovak.artifact.role.persistence.RoleOptionViewProjection;

/**
 * Represents a dropdown option object.
 *
 * @since 0.0.1
 */
public record RoleDropdownOption(
  UUID uuid,

  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  public RoleDropdownOption(RoleOptionViewProjection roleOptionViewProjection) {
    this(
      roleOptionViewProjection.getUuid(),
      roleOptionViewProjection.getName()
    );
  }
}
