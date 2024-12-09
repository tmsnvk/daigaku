/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.persistence;

import java.util.UUID;

import net.tamasnovak.artifact.role.dto.RoleSelectOption;

/**
 * Represents the projection of a {@link RoleSelectOption} object.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface RoleOptionView {
  UUID getUuid();

  String getName();
}
