package net.tamasnovak.artifact.role.persistence;

import net.tamasnovak.artifact.role.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByUuid(UUID uuid);

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
  List<RoleOptionView> getStudentAndMentorRoleOptions();
}
