package net.tamasnovak.services.role;

import net.tamasnovak.entities.role.Role;

public interface RoleService {
  Role findByName(String name);
}
