package net.tamasnovak.repositories.role;

import net.tamasnovak.entities.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByNameContains(String name);
}
