/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.role.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * JPA repository for {@link PendingAccount} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findRoleByUuid(UUID uuid);

  /**
   * Finds the student and mentor roles from the database.
   *
   * @return a list of {@link RoleOptionViewProjection}.
   */
  @Query(value =
    """
        SELECT
          uuid,
          name
        FROM
          roles
        WHERE
          name = 'ROLE_STUDENT' OR
          name = 'ROLE_MENTOR'
      """, nativeQuery = true)
  List<RoleOptionViewProjection> findStudentAndMentorRoleOptions();
}
