/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.persistence;

import java.util.UUID;

import net.tamasnovak.artifact.role.dto.RoleSelectOption;

/**
 * Represents the projection of a {@link RoleSelectOption} object.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface RoleOptionView {
  UUID getUuid();

  String getName();
}
