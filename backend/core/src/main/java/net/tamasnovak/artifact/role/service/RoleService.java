/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.service;

import java.util.List;
import java.util.UUID;

import net.tamasnovak.artifact.role.dto.RoleSelectOption;
import net.tamasnovak.artifact.role.entity.Role;

/**
 * Service interface for handling database API calls related to the {@link Role} entity.
 *
 * @since 0.0.1
 */
public interface RoleService {
  /**
   * Finds the {@link Role} associated with the provided uuid.
   *
   * @param uuid The role's uuid.
   * @return A single {@link Role} object.
   */
  Role findRoleByUuid(UUID uuid);

  /**
   * Finds the student and mentor roles from the database.
   *
   * @return A list of {@link RoleSelectOption} objects.
   */
  List<RoleSelectOption> findStudentAndMentorDropdownOptions();
}
