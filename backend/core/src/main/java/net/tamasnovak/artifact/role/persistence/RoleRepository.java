/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.role.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * JPA repository for {@link PendingAccount} entities.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findRoleByUuid(UUID uuid);

  /**
   * Finds the {@link Student} and {@link Mentor} roles from the database.
   *
   * @return A list of {@link RoleOptionView}.
   */
  @Query(value = """
        SELECT
          uuid,
          name
        FROM roles
        WHERE name IN (:names)
    """, nativeQuery = true)
  List<RoleOptionView> findRoleOptionsByNames(@Param("names") List<String> names);
}
