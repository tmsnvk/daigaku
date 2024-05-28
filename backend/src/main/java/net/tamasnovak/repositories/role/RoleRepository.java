package net.tamasnovak.repositories.role;

import net.tamasnovak.dtos.role.response.RoleOptionView;
import net.tamasnovak.entities.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByNameContains(String name);

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
