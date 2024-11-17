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

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.role.dto.RoleSelectOption;
import net.tamasnovak.artifact.role.entity.Role;

/**
 * Service interface for managing {@link Role} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface RoleService {
  /**
   * Finds the {@link Role} associated with the provided uuid.
   *
   * @param roleUuid The role's uuid.
   * @return {@link Role}.
   * @throws EntityNotFoundException Thrown if no role is associated with the provided uuid.
   */
  Role findRoleByUuid(UUID roleUuid);

  /**
   * Finds the {@link Student} and {@link Mentor} roles from the database.
   *
   * @return A list of {@link RoleSelectOption}.
   */
  List<RoleSelectOption> findStudentAndMentorSelectOptions();
}
